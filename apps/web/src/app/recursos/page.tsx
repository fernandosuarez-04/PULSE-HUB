/**
 * Página: Recursos / AI Academy
 * 
 * Documentación de Contexto para Asistentes IA:
 * - Estrategia de Adopción IA: ../../../docs/product/ESTRATEGIA-ADOPCION-IA.md
 * - PRD Completo: ../../../docs/product/PRD-PULSE-HUB.md
 * - Design System: ../../../docs/design/DESIGN-SYSTEM-PROMPT.md
 * - Arquitectura: ../../../docs/reference/ARCHITECTURE.md
 * 
 * Esta página implementa: AI Academy con cursos, guías descargables y biblioteca de prompts
 */

import type { Metadata } from 'next';
import { RecursosClient } from './RecursosClient';

export const metadata: Metadata = {
  title: 'Recursos / AI Academy | Pulse Hub',
  description: 'Accede a cursos, guías descargables y biblioteca de prompts para profundizar en la adopción de IA ética y efectiva.',
  keywords: ['recursos IA', 'cursos IA', 'guías IA', 'biblioteca prompts', 'AI Academy', 'pulse hub'],
};

export default function RecursosPage() {
  return <RecursosClient />;
}
