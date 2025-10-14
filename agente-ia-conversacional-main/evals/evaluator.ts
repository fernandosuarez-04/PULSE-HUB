// evals/evaluator.ts
import "dotenv/config";
import { RealtimeAgent } from '../server/agent.js';
import { AccuracyEvaluator } from './metrics/accuracy.js';
import { ToneEvaluator } from './metrics/tone.js';
import { LatencyEvaluator } from './metrics/latency.js';
import fs from 'fs/promises';
import path from 'path';

export interface EvalResult {
  metric: string;
  score: number;
  maxScore: number;
  percentage: number;
  details: any;
  timestamp: string;
}

export interface EvalReport {
  overall: {
    score: number;
    maxScore: number;
    percentage: number;
  };
  metrics: EvalResult[];
  summary: string;
  timestamp: string;
}

export class EvalSystem {
  private agent: RealtimeAgent;
  private accuracyEvaluator: AccuracyEvaluator;
  private toneEvaluator: ToneEvaluator;
  private latencyEvaluator: LatencyEvaluator;

  constructor() {
    this.agent = new RealtimeAgent();
    this.accuracyEvaluator = new AccuracyEvaluator();
    this.toneEvaluator = new ToneEvaluator();
    this.latencyEvaluator = new LatencyEvaluator();
  }

  private checkApiKey(): void {
    if (!process.env.OPENWEATHER_API_KEY) {
      console.error('❌ Error: OPENWEATHER_API_KEY no está configurada');
      console.error('💡 Las evaluaciones de exactitud requieren esta API key.');
      console.error('💡 Configura el secret en GitHub o el archivo .env localmente.');
      throw new Error('OPENWEATHER_API_KEY no configurada');
    }
    console.log('✅ API key cargada correctamente');
  }

  async runAllEvals(): Promise<EvalReport> {
    console.log('🧪 Iniciando evaluaciones automáticas...\n');

    // Verificar API key para evaluaciones de exactitud
    this.checkApiKey();

    const results: EvalResult[] = [];

    // 1. Evaluación de Exactitud
    console.log('📊 Evaluando exactitud...');
    const accuracyResult = await this.accuracyEvaluator.evaluate(this.agent);
    results.push(accuracyResult);
    console.log(`✅ Exactitud: ${accuracyResult.percentage.toFixed(1)}%\n`);

    // 2. Evaluación de Tono
    console.log('🎭 Evaluando tono conversacional...');
    const toneResult = await this.toneEvaluator.evaluate(this.agent);
    results.push(toneResult);
    console.log(`✅ Tono: ${toneResult.percentage.toFixed(1)}%\n`);

    // 3. Evaluación de Latencia
    console.log('⚡ Evaluando latencia...');
    const latencyResult = await this.latencyEvaluator.evaluate(this.agent);
    results.push(latencyResult);
    console.log(`✅ Latencia: ${latencyResult.percentage.toFixed(1)}%\n`);

    // Calcular puntuación general
    const totalScore = results.reduce((sum, result) => sum + result.score, 0);
    const maxScore = results.reduce((sum, result) => sum + result.maxScore, 0);
    const overallPercentage = (totalScore / maxScore) * 100;

    const report: EvalReport = {
      overall: {
        score: totalScore,
        maxScore: maxScore,
        percentage: overallPercentage
      },
      metrics: results,
      summary: this.generateSummary(results, overallPercentage),
      timestamp: new Date().toISOString()
    };

    // Guardar reporte
    await this.saveReport(report);

    console.log('📋 RESUMEN FINAL:');
    console.log(`🎯 Puntuación General: ${overallPercentage.toFixed(1)}%`);
    console.log(`📊 Total: ${totalScore}/${maxScore} puntos`);
    console.log(`📝 ${report.summary}\n`);

    return report;
  }

  private generateSummary(results: EvalResult[], overallPercentage: number): string {
    const passedTests = results.filter(r => r.percentage >= 80).length;
    const totalTests = results.length;

    if (overallPercentage >= 90) {
      return `Excelente rendimiento. ${passedTests}/${totalTests} métricas superaron el 80%. El agente está listo para producción.`;
    } else if (overallPercentage >= 75) {
      return `Buen rendimiento. ${passedTests}/${totalTests} métricas superaron el 80%. Se recomiendan mejoras menores.`;
    } else if (overallPercentage >= 60) {
      return `Rendimiento aceptable. ${passedTests}/${totalTests} métricas superaron el 80%. Se requieren mejoras importantes.`;
    } else {
      return `Rendimiento insuficiente. Solo ${passedTests}/${totalTests} métricas superaron el 80%. Se requiere revisión completa.`;
    }
  }

  private async saveReport(report: EvalReport): Promise<void> {
    const reportsDir = path.join(process.cwd(), 'evals', 'reports');
    
    try {
      await fs.mkdir(reportsDir, { recursive: true });
      
      const filename = `report-${new Date().toISOString().split('T')[0]}.json`;
      const filepath = path.join(reportsDir, filename);
      
      await fs.writeFile(filepath, JSON.stringify(report, null, 2));
      await fs.writeFile(path.join(reportsDir, 'latest-report.json'), JSON.stringify(report, null, 2));
      
      console.log(`💾 Reporte guardado: ${filename}`);
    } catch (error) {
      console.error('❌ Error guardando reporte:', error);
    }
  }

  async runSpecificEval(metric: 'accuracy' | 'tone' | 'latency'): Promise<EvalResult> {
    console.log(`🧪 Ejecutando evaluación: ${metric}\n`);

    switch (metric) {
      case 'accuracy':
        // Solo accuracy requiere API key
        this.checkApiKey();
        return await this.accuracyEvaluator.evaluate(this.agent);
      case 'tone':
        return await this.toneEvaluator.evaluate(this.agent);
      case 'latency':
        return await this.latencyEvaluator.evaluate(this.agent);
      default:
        throw new Error(`Métrica no soportada: ${metric}`);
    }
  }
}
