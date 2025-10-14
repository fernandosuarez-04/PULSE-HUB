/**
 * Página: Casos de Éxito
 * 
 * Documentación de Contexto para Asistentes IA:
 * - Estrategia de Adopción IA: ../../../docs/product/ESTRATEGIA-ADOPCION-IA.md
 * - PRD Completo: ../../../docs/product/PRD-PULSE-HUB.md
 * - Design System: ../../../docs/design/DESIGN-SYSTEM-PROMPT.md
 * - Arquitectura: ../../../docs/reference/ARCHITECTURE.md
 * 
 * Esta página implementa: Casos de éxito con filtros por industria y resultados medibles
 */

import type { Metadata } from 'next';
import { CasosDeExitoClient } from './CasosDeExitoClient';

export const metadata: Metadata = {
  title: 'Casos de Éxito | Pulse Hub',
  description: 'Descubre cómo organizaciones han transformado sus procesos con IA utilizando nuestros tres pilares: capacitación, adopción diaria y automatización.',
  keywords: ['casos de éxito IA', 'transformación digital', 'implementación IA', 'resultados medibles', 'pulse hub'],
};

export default function CasosDeExitoPage() {
  return <CasosDeExitoClient />;
}
