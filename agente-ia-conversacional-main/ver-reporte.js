// Script para ver el último reporte de evaluaciones
import fs from 'fs';
import path from 'path';

try {
  const reportPath = path.join('evals', 'reports', 'latest-report.json');
  
  if (fs.existsSync(reportPath)) {
    const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
    
    console.log('📊 REPORTE DETALLADO DE EVALUACIONES\n');
    console.log(`🎯 Puntuación General: ${report.overall.percentage.toFixed(1)}%`);
    console.log(`📈 Total: ${report.overall.score}/${report.overall.maxScore} puntos\n`);
    
    console.log('📋 MÉTRICAS DETALLADAS:\n');
    
    report.metrics.forEach(metric => {
      const emoji = metric.percentage >= 90 ? '🟢' : metric.percentage >= 75 ? '🟡' : '🔴';
      console.log(`${emoji} ${metric.metric.toUpperCase()}: ${metric.percentage.toFixed(1)}%`);
      console.log(`   Puntuación: ${metric.score}/${metric.maxScore}`);
      
      if (metric.details && metric.details.length > 0) {
        console.log(`   Pruebas realizadas: ${metric.details.length}`);
        
        // Mostrar algunas pruebas específicas
        metric.details.slice(0, 3).forEach(detail => {
          const status = detail.passed ? '✅' : detail.score >= 5 ? '⚠️' : '❌';
          console.log(`   ${status} ${detail.testCase || detail.description}: ${detail.score}/10`);
        });
        
        if (metric.details.length > 3) {
          console.log(`   ... y ${metric.details.length - 3} pruebas más`);
        }
      }
      console.log('');
    });
    
    console.log(`📝 RESUMEN: ${report.summary}\n`);
    console.log(`🕒 Generado: ${new Date(report.timestamp).toLocaleString()}`);
    
  } else {
    console.log('❌ No se encontró el reporte de evaluaciones.');
    console.log('💡 Ejecuta primero: npm run evals');
  }
} catch (error) {
  console.error('❌ Error leyendo el reporte:', error.message);
}
