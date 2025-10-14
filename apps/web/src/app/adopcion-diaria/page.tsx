/**
 * Página: Adopción Diaria - Pilar 2
 * 
 * Documentación de Contexto para Asistentes IA:
 * - Estrategia de Adopción IA: ../../../docs/product/ESTRATEGIA-ADOPCION-IA.md
 * - PRD Completo: ../../../docs/product/PRD-PULSE-HUB.md
 * - Design System: ../../../docs/design/DESIGN-SYSTEM-PROMPT.md
 * - Arquitectura: ../../../docs/reference/ARCHITECTURE.md
 * 
 * Esta página implementa: Pilar 2 - IA en el Día a Día (AI Buddy, rituales y biblioteca de prompts)
 */

import type { Metadata } from 'next';
import { AdopcionDiariaClient } from './AdopcionDiariaClient';

export const metadata: Metadata = {
  title: 'Adopción Diaria | Pilar 2 - Pulse Hub',
  description: 'Integra IA en tu día a día con AI Buddy, rituales efectivos y biblioteca de prompts por área funcional.',
  keywords: ['adopción diaria IA', 'AI Buddy', 'rituales IA', 'biblioteca prompts', 'pilar 2 pulse hub'],
};

export default function AdopcionDiariaPage() {
  return <AdopcionDiariaClient />;
}
