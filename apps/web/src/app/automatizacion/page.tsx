/**
 * Página: Automatización - Pilar 3
 * 
 * Documentación de Contexto para Asistentes IA:
 * - Estrategia de Adopción IA: ../../../docs/product/ESTRATEGIA-ADOPCION-IA.md
 * - PRD Completo: ../../../docs/product/PRD-PULSE-HUB.md
 * - Design System: ../../../docs/design/DESIGN-SYSTEM-PROMPT.md
 * - Arquitectura: ../../../docs/reference/ARCHITECTURE.md
 * 
 * Esta página implementa: Pilar 3 - Automatización de Alto Impacto (Matriz impacto-esfuerzo, gobernanza y ROI)
 */

import type { Metadata } from 'next';
import { AutomatizacionClient } from './AutomatizacionClient';

export const metadata: Metadata = {
  title: 'Automatización | Pilar 3 - Pulse Hub',
  description: 'Automatización de alto impacto con IA: prioriza, gobierna y mide el ROI de tus procesos automatizados.',
  keywords: ['automatización IA', 'alto impacto', 'ROI medible', 'gobernanza IA', 'pilar 3 pulse hub'],
};

export default function AutomatizacionPage() {
  return <AutomatizacionClient />;
}
