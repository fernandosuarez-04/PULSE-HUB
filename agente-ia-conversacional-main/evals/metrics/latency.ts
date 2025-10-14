// evals/metrics/latency.ts
import { RealtimeAgent } from '../../server/agent.js';
import { EvalResult } from '../evaluator.js';
import fs from 'fs';

export class LatencyEvaluator {
  async evaluate(agent: RealtimeAgent): Promise<EvalResult> {
    console.log('  📋 Ejecutando pruebas de latencia...');
    
    // Cargar casos de prueba
    const performanceTestCases = JSON.parse(
      fs.readFileSync('evals/test-cases/performance-tests.json', 'utf8')
    );
    
    const results: any[] = [];
    let totalScore = 0;
    const maxScore = performanceTestCases.length * 10; // 10 puntos por prueba

    for (const testCase of performanceTestCases) {
      try {
        const result = await this.runLatencyTest(agent, testCase);
        results.push(result);
        totalScore += result.score;
        
        const status = result.score >= 8 ? '✅' : result.score >= 5 ? '⚠️' : '❌';
        console.log(`    ${status} ${testCase.description}: ${result.responseTime}ms (${result.score}/10)`);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.log(`    ❌ ${testCase.description}: Error - ${errorMessage}`);
        results.push({
          testCase: testCase.description,
          score: 0,
          error: errorMessage
        });
      }
    }

    // Calcular estadísticas adicionales
    const responseTimes = results
      .filter(r => r.responseTime)
      .map(r => r.responseTime);
    
    const avgResponseTime = responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length;
    const maxResponseTime = Math.max(...responseTimes);
    const minResponseTime = Math.min(...responseTimes);

    return {
      metric: 'latency',
      score: totalScore,
      maxScore: maxScore,
      percentage: (totalScore / maxScore) * 100,
      details: {
        results: results,
        statistics: {
          averageResponseTime: Math.round(avgResponseTime),
          maxResponseTime: maxResponseTime,
          minResponseTime: minResponseTime,
          totalTests: performanceTestCases.length,
          passedTests: results.filter(r => r.score >= 8).length
        }
      },
      timestamp: new Date().toISOString()
    };
  }

  private async runLatencyTest(agent: RealtimeAgent, testCase: any): Promise<any> {
    const iterations = 3; // Ejecutar cada prueba 3 veces para obtener promedio
    const times: number[] = [];

    // Ejecutar múltiples iteraciones
    for (let i = 0; i < iterations; i++) {
      const startTime = Date.now();
      await agent.handleMessage(testCase.input);
      const endTime = Date.now();
      times.push(endTime - startTime);
      
      // Pequeña pausa entre iteraciones
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    const avgTime = times.reduce((sum, time) => sum + time, 0) / times.length;
    const responseTime = Math.round(avgTime);

    let score = 0;
    const checks: string[] = [];

    // 1. Tiempo de respuesta excelente (4 puntos) - < 500ms
    if (responseTime < 500) {
      score += 4;
      checks.push('✅ Tiempo de respuesta excelente (< 500ms)');
    }
    // 2. Tiempo de respuesta bueno (3 puntos) - < 1000ms
    else if (responseTime < 1000) {
      score += 3;
      checks.push('✅ Tiempo de respuesta bueno (< 1000ms)');
    }
    // 3. Tiempo de respuesta aceptable (2 puntos) - < 2000ms
    else if (responseTime < 2000) {
      score += 2;
      checks.push('⚠️ Tiempo de respuesta aceptable (< 2000ms)');
    }
    // 4. Tiempo de respuesta lento (1 punto) - < 3000ms
    else if (responseTime < 3000) {
      score += 1;
      checks.push('⚠️ Tiempo de respuesta lento (< 3000ms)');
    }
    else {
      checks.push('❌ Tiempo de respuesta muy lento (> 3000ms)');
    }

    // 5. Consistencia en tiempos de respuesta (3 puntos)
    const maxDeviation = Math.max(...times) - Math.min(...times);
    if (maxDeviation < 200) {
      score += 3;
      checks.push('✅ Consistencia excelente en tiempos');
    } else if (maxDeviation < 500) {
      score += 2;
      checks.push('✅ Consistencia buena en tiempos');
    } else if (maxDeviation < 1000) {
      score += 1;
      checks.push('⚠️ Consistencia aceptable en tiempos');
    } else {
      checks.push('❌ Inconsistencia en tiempos de respuesta');
    }

    // 6. Sin errores de timeout (3 puntos)
    const hasTimeouts = times.some(time => time > 5000);
    if (!hasTimeouts) {
      score += 3;
      checks.push('✅ Sin errores de timeout');
    } else {
      checks.push('❌ Errores de timeout detectados');
    }

    return {
      testCase: testCase.description,
      input: testCase.input,
      responseTime: responseTime,
      individualTimes: times,
      maxDeviation: maxDeviation,
      score: score,
      maxScore: 10,
      checks: checks,
      passed: score >= 8
    };
  }
}
