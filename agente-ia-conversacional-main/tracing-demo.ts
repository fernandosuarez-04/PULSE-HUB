// tracing-demo.ts
import { SessionGenerator } from './server/tracing/session-generator.js';
import { SessionAnalyzer } from './server/tracing/session-analyzer.js';
import { globalTracer } from './server/tracing/tracer.js';

async function main() {
  console.log('🚀 Demo de Sistema de Trazas\n');
  console.log('═'.repeat(60));
  console.log('\n');

  // Paso 1: Generar sesiones de prueba
  console.log('📝 PASO 1: Generando sesiones de prueba...\n');
  const generator = new SessionGenerator();
  await generator.generateTestSessions();

  console.log('\n' + '═'.repeat(60) + '\n');

  // Paso 2: Listar sesiones generadas
  console.log('📋 PASO 2: Sesiones disponibles\n');
  const sessions = await globalTracer.listSessions();
  sessions.forEach((s, i) => {
    console.log(`  ${i + 1}. ${s}`);
  });

  console.log('\n' + '═'.repeat(60) + '\n');

  // Paso 3: Analizar sesiones
  console.log('🔍 PASO 3: Analizando sesiones...\n');
  const analyzer = new SessionAnalyzer();

  // Analizar las 3 sesiones principales
  const sessionsToAnalyze = [
    'session-clima-multiple',
    'session-con-errores',
    'session-exploracion'
  ];

  console.log(`Analizando ${sessionsToAnalyze.length} sesiones...\n`);

  // Paso 4: Generar reporte
  console.log('📊 PASO 4: Generando reporte de análisis...\n');
  const report = await analyzer.generateReport(sessionsToAnalyze);
  await analyzer.saveReport(report);

  console.log('\n' + '═'.repeat(60) + '\n');

  // Paso 5: Mostrar hallazgos accionables
  console.log('🎯 PASO 5: Hallazgos Accionables\n');

  let actionableCount = 0;
  for (const sessionId of sessionsToAnalyze) {
    const findings = await analyzer.analyzeSession(sessionId);
    const actionable = findings.filter(f => f.actionable);

    if (actionable.length > 0) {
      console.log(`\n📍 Sesión: ${sessionId}`);
      actionable.forEach((f, i) => {
        actionableCount++;
        const severityEmoji = f.severity === 'high' ? '🔴' : f.severity === 'medium' ? '🟡' : '🟢';
        console.log(`\n  ${severityEmoji} Hallazgo ${i + 1}: ${f.title}`);
        console.log(`     Categoría: ${f.category}`);
        console.log(`     Recomendación: ${f.recommendation}`);
      });
    }
  }

  console.log('\n' + '═'.repeat(60) + '\n');

  // Resumen final
  console.log('✅ RESUMEN FINAL\n');
  console.log(`  📊 Sesiones analizadas: ${sessionsToAnalyze.length}`);
  console.log(`  🎯 Hallazgos accionables: ${actionableCount}`);
  console.log(`  📄 Reporte guardado en: traces/analysis-report.md\n`);

  console.log('💡 Próximos pasos:');
  console.log('  1. Revisa el reporte en traces/analysis-report.md');
  console.log('  2. Revisa las sesiones JSON en traces/');
  console.log('  3. Crea tareas basadas en los hallazgos accionables\n');
}

main().catch(console.error);
