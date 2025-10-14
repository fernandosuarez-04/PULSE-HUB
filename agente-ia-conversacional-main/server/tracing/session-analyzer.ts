// server/tracing/session-analyzer.ts
import { globalTracer, Session, TraceEvent } from './tracer.js';
import fs from 'fs/promises';
import path from 'path';

export interface Finding {
  id: string;
  severity: 'high' | 'medium' | 'low';
  category: 'performance' | 'error' | 'usability' | 'quality';
  title: string;
  description: string;
  evidence: any;
  recommendation: string;
  actionable: boolean;
}

export class SessionAnalyzer {
  async analyzeSession(sessionId: string): Promise<Finding[]> {
    const session = await globalTracer.loadSession(sessionId);
    if (!session) {
      throw new Error(`Sesión no encontrada: ${sessionId}`);
    }

    const findings: Finding[] = [];

    // Análisis 1: Latencia alta
    findings.push(...this.analyzeLatency(session));

    // Análisis 2: Errores
    findings.push(...this.analyzeErrors(session));

    // Análisis 3: Intenciones no reconocidas
    findings.push(...this.analyzeIntents(session));

    // Análisis 4: Calidad de respuestas
    findings.push(...this.analyzeResponseQuality(session));

    // Análisis 5: Uso de herramientas
    findings.push(...this.analyzeToolUsage(session));

    return findings;
  }

  private analyzeLatency(session: Session): Finding[] {
    const findings: Finding[] = [];
    const outputEvents = session.events.filter(e => e.type === 'output');
    const highLatencyEvents = outputEvents.filter(e => e.data.latency > 2000);

    if (highLatencyEvents.length > 0) {
      const avgHighLatency = highLatencyEvents.reduce((sum, e) => sum + e.data.latency, 0) / highLatencyEvents.length;

      findings.push({
        id: `${session.sessionId}-latency-high`,
        severity: 'high',
        category: 'performance',
        title: 'Latencia alta detectada',
        description: `${highLatencyEvents.length} respuestas tardaron más de 2 segundos (promedio: ${avgHighLatency.toFixed(0)}ms)`,
        evidence: {
          count: highLatencyEvents.length,
          averageLatency: avgHighLatency,
          maxLatency: Math.max(...highLatencyEvents.map(e => e.data.latency)),
          examples: highLatencyEvents.slice(0, 3).map(e => ({
            timestamp: e.timestamp,
            latency: e.data.latency,
            message: e.data.message.substring(0, 50)
          }))
        },
        recommendation: 'Optimizar llamadas a APIs externas, implementar caché para ciudades frecuentes',
        actionable: true
      });
    }

    return findings;
  }

  private analyzeErrors(session: Session): Finding[] {
    const findings: Finding[] = [];
    const errorEvents = session.events.filter(e => e.type === 'error');

    if (errorEvents.length > 0) {
      findings.push({
        id: `${session.sessionId}-errors`,
        severity: 'high',
        category: 'error',
        title: `${errorEvents.length} error(es) durante la sesión`,
        description: 'Se detectaron errores que afectaron la experiencia del usuario',
        evidence: {
          count: errorEvents.length,
          errors: errorEvents.map(e => ({
            timestamp: e.timestamp,
            error: e.data.error,
            context: e.data.context
          }))
        },
        recommendation: 'Implementar manejo de errores más robusto, validar ciudades antes de llamar API',
        actionable: true
      });
    }

    return findings;
  }

  private analyzeIntents(session: Session): Finding[] {
    const findings: Finding[] = [];
    const intentEvents = session.events.filter(e => e.type === 'intent');
    const conversationIntents = intentEvents.filter(e => e.data.intent === 'conversation');

    // Si más del 40% son "conversation", puede indicar intenciones no reconocidas
    if (conversationIntents.length / intentEvents.length > 0.4 && intentEvents.length > 3) {
      findings.push({
        id: `${session.sessionId}-intents-unrecognized`,
        severity: 'medium',
        category: 'usability',
        title: 'Posibles intenciones no reconocidas',
        description: `${conversationIntents.length} de ${intentEvents.length} mensajes cayeron en "conversación general"`,
        evidence: {
          totalIntents: intentEvents.length,
          conversationIntents: conversationIntents.length,
          percentage: (conversationIntents.length / intentEvents.length * 100).toFixed(1)
        },
        recommendation: 'Mejorar clasificación de intenciones, agregar más patrones de reconocimiento',
        actionable: true
      });
    }

    return findings;
  }

  private analyzeResponseQuality(session: Session): Finding[] {
    const findings: Finding[] = [];
    const outputEvents = session.events.filter(e => e.type === 'output');
    const shortResponses = outputEvents.filter(e => e.data.message.length < 30);

    if (shortResponses.length > outputEvents.length * 0.3) {
      findings.push({
        id: `${session.sessionId}-responses-short`,
        severity: 'low',
        category: 'quality',
        title: 'Respuestas muy cortas detectadas',
        description: `${shortResponses.length} de ${outputEvents.length} respuestas son muy breves`,
        evidence: {
          count: shortResponses.length,
          percentage: (shortResponses.length / outputEvents.length * 100).toFixed(1),
          examples: shortResponses.slice(0, 3).map(e => e.data.message)
        },
        recommendation: 'Enriquecer respuestas con más contexto y sugerencias',
        actionable: false
      });
    }

    return findings;
  }

  private analyzeToolUsage(session: Session): Finding[] {
    const findings: Finding[] = [];
    const toolEvents = session.events.filter(e => e.type === 'tool_call');
    const slowTools = toolEvents.filter(e => e.data.duration > 1000);

    if (slowTools.length > 0) {
      findings.push({
        id: `${session.sessionId}-tools-slow`,
        severity: 'medium',
        category: 'performance',
        title: 'Herramientas lentas detectadas',
        description: `${slowTools.length} llamadas a herramientas tardaron >1s`,
        evidence: {
          count: slowTools.length,
          tools: slowTools.map(e => ({
            toolName: e.data.toolName,
            duration: e.data.duration,
            params: e.data.params
          }))
        },
        recommendation: 'Implementar timeout, caché de resultados, llamadas paralelas cuando sea posible',
        actionable: true
      });
    }

    return findings;
  }

  async generateReport(sessionIds: string[]): Promise<string> {
    let report = '# 📊 Reporte de Análisis de Sesiones\n\n';
    report += `Fecha: ${new Date().toISOString()}\n`;
    report += `Sesiones analizadas: ${sessionIds.length}\n\n`;

    for (const sessionId of sessionIds) {
      report += `## Sesión: ${sessionId}\n\n`;

      const session = await globalTracer.loadSession(sessionId);
      if (!session) {
        report += '⚠️ Sesión no encontrada\n\n';
        continue;
      }

      // Resumen de la sesión
      report += '### Resumen\n';
      report += `- Inicio: ${session.startTime}\n`;
      report += `- Fin: ${session.endTime || 'En progreso'}\n`;
      report += `- Total mensajes: ${session.metadata.totalMessages}\n`;
      report += `- Latencia promedio: ${session.metadata.averageLatency.toFixed(0)}ms\n`;
      report += `- Errores: ${session.metadata.totalErrors}\n`;
      report += `- Intenciones: ${session.metadata.intents.join(', ')}\n`;
      report += `- Herramientas usadas: ${session.metadata.toolsCalled.join(', ') || 'Ninguna'}\n\n`;

      // Hallazgos
      const findings = await this.analyzeSession(sessionId);
      report += '### 🔍 Hallazgos\n\n';

      if (findings.length === 0) {
        report += '✅ No se encontraron problemas significativos\n\n';
      } else {
        for (const finding of findings) {
          const severityEmoji = finding.severity === 'high' ? '🔴' : finding.severity === 'medium' ? '🟡' : '🟢';
          report += `#### ${severityEmoji} ${finding.title}\n`;
          report += `- **Severidad**: ${finding.severity}\n`;
          report += `- **Categoría**: ${finding.category}\n`;
          report += `- **Descripción**: ${finding.description}\n`;
          report += `- **Recomendación**: ${finding.recommendation}\n`;
          report += `- **Accionable**: ${finding.actionable ? 'Sí ✅' : 'No'}\n\n`;
        }
      }

      report += '---\n\n';
    }

    // Hallazgos accionables consolidados
    const allFindings: Finding[] = [];
    for (const sessionId of sessionIds) {
      const findings = await this.analyzeSession(sessionId);
      allFindings.push(...findings);
    }

    const actionableFindings = allFindings.filter(f => f.actionable);

    report += '## 🎯 Hallazgos Accionables (Consolidados)\n\n';

    if (actionableFindings.length === 0) {
      report += '✅ No hay hallazgos accionables\n\n';
    } else {
      // Agrupar por categoría
      const byCategory = actionableFindings.reduce((acc, f) => {
        if (!acc[f.category]) acc[f.category] = [];
        acc[f.category].push(f);
        return acc;
      }, {} as Record<string, Finding[]>);

      for (const [category, findings] of Object.entries(byCategory)) {
        report += `### ${category.toUpperCase()}\n\n`;
        findings.forEach((f, i) => {
          report += `${i + 1}. **${f.title}**\n`;
          report += `   - ${f.recommendation}\n\n`;
        });
      }
    }

    return report;
  }

  async saveReport(report: string, filename: string = 'analysis-report.md'): Promise<void> {
    const tracesDir = path.join(process.cwd(), 'traces');
    const filepath = path.join(tracesDir, filename);
    await fs.writeFile(filepath, report);
    console.log(`📄 Reporte guardado: ${filepath}`);
  }
}
