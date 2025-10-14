// evals/metrics/accuracy.ts
import { RealtimeAgent } from '../../server/agent.js';
import { EvalResult } from '../evaluator.js';
import fs from 'fs';

export class AccuracyEvaluator {
  async evaluate(agent: RealtimeAgent): Promise<EvalResult> {
    console.log('  📋 Ejecutando pruebas de exactitud...');
    
    // Cargar casos de prueba
    const weatherTestCases = JSON.parse(
      fs.readFileSync('evals/test-cases/weather-tests.json', 'utf8')
    );
    
    let totalScore = 0;
    const maxScore = weatherTestCases.length * 10; // 10 puntos por prueba
    const details: any[] = [];

    for (const testCase of weatherTestCases) {
      try {
        const result = await this.runTestCase(agent, testCase);
        details.push(result);
        totalScore += result.score;
        
        const status = result.score >= 8 ? '✅' : result.score >= 5 ? '⚠️' : '❌';
        console.log(`    ${status} ${testCase.description}: ${result.score}/10`);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.log(`    ❌ ${testCase.description}: Error - ${errorMessage}`);
        details.push({
          testCase: testCase.description,
          score: 0,
          error: errorMessage
        });
      }
    }

    return {
      metric: 'accuracy',
      score: totalScore,
      maxScore: maxScore,
      percentage: (totalScore / maxScore) * 100,
      details: details,
      timestamp: new Date().toISOString()
    };
  }

  private async runTestCase(agent: RealtimeAgent, testCase: any): Promise<any> {
    const startTime = Date.now();
    const response = await agent.handleMessage(testCase.input);
    const responseTime = Date.now() - startTime;

    let score = 0;
    const checks: string[] = [];

    // 1. Verificar que la respuesta contiene la ciudad (2 puntos)
    if (testCase.expectedCity && response.toLowerCase().includes(testCase.expectedCity.toLowerCase())) {
      score += 2;
      checks.push('✅ Ciudad mencionada correctamente');
    } else {
      checks.push('❌ Ciudad no mencionada o incorrecta');
    }

    // 2. Verificar que la respuesta contiene información meteorológica (3 puntos)
    const weatherKeywords = ['clima', 'tiempo', 'temperatura', 'grados', '°c', 'soleado', 'nublado', 'lluvia'];
    const hasWeatherInfo = weatherKeywords.some(keyword => 
      response.toLowerCase().includes(keyword)
    );
    
    if (hasWeatherInfo) {
      score += 3;
      checks.push('✅ Información meteorológica presente');
    } else {
      checks.push('❌ Falta información meteorológica');
    }

    // 3. Verificar formato de respuesta (2 puntos)
    if (response.includes('°C') || response.includes('grados')) {
      score += 2;
      checks.push('✅ Formato de temperatura correcto');
    } else {
      checks.push('❌ Formato de temperatura incorrecto');
    }

    // 4. Verificar que la respuesta es apropiada (2 puntos)
    if (response.length > 20 && response.length < 200) {
      score += 2;
      checks.push('✅ Longitud de respuesta apropiada');
    } else {
      checks.push('❌ Longitud de respuesta inapropiada');
    }

    // 5. Verificar tiempo de respuesta (1 punto)
    if (responseTime < 3000) { // Menos de 3 segundos
      score += 1;
      checks.push('✅ Tiempo de respuesta aceptable');
    } else {
      checks.push('❌ Tiempo de respuesta lento');
    }

    return {
      testCase: testCase.description,
      input: testCase.input,
      expectedCity: testCase.expectedCity,
      response: response,
      responseTime: responseTime,
      score: score,
      maxScore: 10,
      checks: checks,
      passed: score >= 8
    };
  }
}
