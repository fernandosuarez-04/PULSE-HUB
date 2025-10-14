/**
 * Página: Capacitación IA - Pilar 1
 * 
 * Documentación de Contexto para Asistentes IA:
 * - Estrategia de Adopción IA: ../../../docs/product/ESTRATEGIA-ADOPCION-IA.md
 * - PRD Completo: ../../../docs/product/PRD-PULSE-HUB.md
 * - Design System: ../../../docs/design/DESIGN-SYSTEM-PROMPT.md
 * - Arquitectura: ../../../docs/reference/ARCHITECTURE.md
 * 
 * Esta página implementa: Pilar 1 - IA para Todos (Capacitación por rol con ética y seguridad)
 */

import React from 'react';
import type { Metadata } from 'next';
import { CapacitacionIAClient } from './CapacitacionIAClient';

// Metadata para SEO
export const metadata: Metadata = {
  title: 'Capacitación IA | Pilar 1 - Pulse Hub',
  description: 'Capacitación personalizada por rol con enfoque en ética, seguridad y resultados medibles. Programas para Dirección, Mandos Medios y Operativos.',
  keywords: ['capacitación IA', 'formación inteligencia artificial', 'cursos IA empresas', 'pilar 1 pulse hub'],
};

export default function CapacitacionIAPage() {
  return <CapacitacionIAClient />;
}
