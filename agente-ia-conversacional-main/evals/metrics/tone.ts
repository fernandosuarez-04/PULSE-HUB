// evals/metrics/tone.ts
import { RealtimeAgent } from '../../server/agent.js';
import { EvalResult } from '../evaluator.js';
import fs from 'fs';

export class ToneEvaluator {
  async evaluate(agent: RealtimeAgent): Promise<EvalResult> {
    console.log('  📋 Ejecutando pruebas de tono conversacional...');
    
    // Cargar casos de prueba
    const conversationTestCases = JSON.parse(
      fs.readFileSync('evals/test-cases/conversation-tests.json', 'utf8')
    );
    
    let totalScore = 0;
    const maxScore = conversationTestCases.length * 10; // 10 puntos por prueba
    const details: any[] = [];

    for (const testCase of conversationTestCases) {
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
      metric: 'tone',
      score: totalScore,
      maxScore: maxScore,
      percentage: (totalScore / maxScore) * 100,
      details: details,
      timestamp: new Date().toISOString()
    };
  }

  private async runTestCase(agent: RealtimeAgent, testCase: any): Promise<any> {
    const response = await agent.handleMessage(testCase.input);

    let score = 0;
    const checks: string[] = [];

    // 1. Verificar amabilidad (3 puntos)
    const friendlyKeywords = ['hola', 'gracias', 'por favor', 'ayudar', 'placer', 'alegra', 'gusto'];
    const isFriendly = friendlyKeywords.some(keyword => 
      response.toLowerCase().includes(keyword)
    );
    
    if (isFriendly) {
      score += 3;
      checks.push('✅ Respuesta amigable');
    } else {
      checks.push('❌ Respuesta no suficientemente amigable');
    }

    // 2. Verificar tono apropiado para el contexto (2 puntos)
    const contextAppropriate = this.checkContextAppropriate(testCase.expectedTone, response);
    if (contextAppropriate) {
      score += 2;
      checks.push('✅ Tono apropiado para el contexto');
    } else {
      checks.push('❌ Tono no apropiado para el contexto');
    }

    // 3. Verificar que no contiene respuestas negativas o agresivas (2 puntos)
    const negativeKeywords = ['no puedo', 'imposible', 'error', 'malo', 'terrible', 'odio'];
    const hasNegativeTone = negativeKeywords.some(keyword => 
      response.toLowerCase().includes(keyword)
    );
    
    if (!hasNegativeTone) {
      score += 2;
      checks.push('✅ Sin tono negativo');
    } else {
      checks.push('❌ Tono negativo detectado');
    }

    // 4. Verificar coherencia en el estilo (2 puntos)
    const isConsistent = this.checkStyleConsistency(response);
    if (isConsistent) {
      score += 2;
      checks.push('✅ Estilo consistente');
    } else {
      checks.push('❌ Estilo inconsistente');
    }

    // 5. Verificar que la respuesta es útil (1 punto)
    if (response.length > 10 && !response.includes('no estoy seguro')) {
      score += 1;
      checks.push('✅ Respuesta útil');
    } else {
      checks.push('❌ Respuesta poco útil');
    }

    return {
      testCase: testCase.description,
      input: testCase.input,
      expectedTone: testCase.expectedTone,
      response: response,
      score: score,
      maxScore: 10,
      checks: checks,
      passed: score >= 8
    };
  }

  private checkContextAppropriate(expectedTone: string, response: string): boolean {
    const responseLower = response.toLowerCase();
    
    switch (expectedTone) {
      case 'greeting':
        return responseLower.includes('hola') || responseLower.includes('saludos') || responseLower.includes('bienvenido');
      case 'helpful':
        return responseLower.includes('ayudar') || responseLower.includes('puedo') || responseLower.includes('asistir');
      case 'informative':
        return responseLower.includes('información') || responseLower.includes('clima') || responseLower.includes('tiempo');
      case 'polite':
        return responseLower.includes('por favor') || responseLower.includes('gracias') || responseLower.includes('permíteme');
      default:
        return true;
    }
  }

  private checkStyleConsistency(response: string): boolean {
    // Verificar que usa signos de exclamación apropiadamente
    const exclamationCount = (response.match(/!/g) || []).length;
    const isAppropriateExclamation = exclamationCount <= 2;
    
    // Verificar que no mezcla estilos muy diferentes
    const hasMixedStyles = response.includes('¡') && response.includes('?') && 
                          response.includes('.') && response.includes('!');
    
    return isAppropriateExclamation && !hasMixedStyles;
  }
}
