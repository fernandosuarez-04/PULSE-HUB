// evals/run-evals.ts
import "dotenv/config";
import { EvalSystem } from './evaluator.js';

async function main() {
  const args = process.argv.slice(2);
  const evalType = args[0] || 'all';

  const evalSystem = new EvalSystem();

  try {
    switch (evalType) {
      case 'accuracy':
        console.log('🎯 Ejecutando solo evaluaciones de exactitud...\n');
        const accuracyResult = await evalSystem.runSpecificEval('accuracy');
        console.log(`\n📊 Resultado de Exactitud: ${accuracyResult.percentage.toFixed(1)}%`);
        break;

      case 'tone':
        console.log('🎭 Ejecutando solo evaluaciones de tono...\n');
        const toneResult = await evalSystem.runSpecificEval('tone');
        console.log(`\n📊 Resultado de Tono: ${toneResult.percentage.toFixed(1)}%`);
        break;

      case 'latency':
        console.log('⚡ Ejecutando solo evaluaciones de latencia...\n');
        const latencyResult = await evalSystem.runSpecificEval('latency');
        console.log(`\n📊 Resultado de Latencia: ${latencyResult.percentage.toFixed(1)}%`);
        break;

      case 'all':
      default:
        await evalSystem.runAllEvals();
        break;
    }

    console.log('\n🎉 Evaluaciones completadas exitosamente!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error ejecutando evaluaciones:', error);
    process.exit(1);
  }
}

// Ejecutar directamente
main();
