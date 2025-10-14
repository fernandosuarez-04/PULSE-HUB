// server/tracing/session-generator.ts
import { RealtimeAgent } from '../agent.js';
import { globalTracer } from './tracer.js';

export class SessionGenerator {
  private agent: RealtimeAgent;

  constructor() {
    this.agent = new RealtimeAgent();
  }

  async generateTestSessions(): Promise<void> {
    console.log('🧪 Generando sesiones de prueba para análisis...\n');

    await globalTracer.initialize();

    // Sesión 1: Usuario preguntando sobre clima en varias ciudades
    await this.runSession1();

    // Sesión 2: Usuario conversacional con algunos errores
    await this.runSession2();

    // Sesión 3: Usuario explorando capacidades del agente
    await this.runSession3();

    console.log('\n✅ Sesiones de prueba generadas exitosamente');
    console.log('📁 Revisa la carpeta "traces/" para ver los archivos JSON');
  }

  private async runSession1(): Promise<void> {
    console.log('📊 Sesión 1: Consultas de clima múltiples');
    globalTracer.startSession('session-clima-multiple');

    const messages = [
      'Hola',
      '¿Qué clima hace en Madrid?',
      'Y en Barcelona?',
      'Necesito saber el tiempo en París',
      '¿Está lloviendo en Londres?',
      'Gracias por la información',
      'Adiós'
    ];

    for (const msg of messages) {
      await this.sendMessage(msg);
      await this.delay(500); // Simular tiempo entre mensajes
    }

    await globalTracer.endSession();
    console.log('✅ Sesión 1 completada\n');
  }

  private async runSession2(): Promise<void> {
    console.log('📊 Sesión 2: Conversación con ciudad inválida');
    globalTracer.startSession('session-con-errores');

    const messages = [
      'Hey',
      '¿Cómo te llamas?',
      '¿Qué clima hace en Ciudad Imaginaria XYZ?', // Ciudad que no existe
      'Mmm, ¿y en Tokyo?',
      'Ok, gracias',
      'Hasta luego'
    ];

    for (const msg of messages) {
      await this.sendMessage(msg);
      await this.delay(300);
    }

    await globalTracer.endSession();
    console.log('✅ Sesión 2 completada\n');
  }

  private async runSession3(): Promise<void> {
    console.log('📊 Sesión 3: Usuario explorando capacidades');
    globalTracer.startSession('session-exploracion');

    const messages = [
      'Buenos días',
      '¿Qué puedes hacer?',
      '¿Puedes ayudarme con el clima?',
      '¿Cómo está el clima en New York?',
      '¿Y la temperatura en Miami?',
      'Perfecto, muchas gracias',
      '¿Puedes recordar mi nombre?',
      'Me llamo María',
      'Ok, adiós'
    ];

    for (const msg of messages) {
      await this.sendMessage(msg);
      await this.delay(400);
    }

    await globalTracer.endSession();
    console.log('✅ Sesión 3 completada\n');
  }

  private async sendMessage(message: string): Promise<void> {
    console.log(`  👤 Usuario: ${message}`);
    const response = await this.agent.handleMessage(message);
    console.log(`  🤖 Agente: ${response.substring(0, 80)}${response.length > 80 ? '...' : ''}`);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Ejecutar si es llamado directamente
if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, '/')}`) {
  const generator = new SessionGenerator();
  generator.generateTestSessions().catch(console.error);
}
