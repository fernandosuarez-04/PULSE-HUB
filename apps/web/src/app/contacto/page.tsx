/**
 * Página: Contacto / Agenda Demo - Pulse Hub
 * 
 * Documentación de Contexto para Asistentes IA:
 * - Estrategia de Adopción IA: ../../../docs/product/ESTRATEGIA-ADOPCION-IA.md
 * - PRD Completo: ../../../docs/product/PRD-PULSE-HUB.md
 * - Design System: ../../../docs/design/DESIGN-SYSTEM-PROMPT.md
 * - Arquitectura: ../../../docs/reference/ARCHITECTURE.md
 * 
 * Esta página implementa: FR-6 del PRD - Contacto y Agenda de Demos con formulario completo y cards de acción
 */

import type { Metadata } from 'next';
import { ContactoClient } from './ContactoClient';

export const metadata: Metadata = {
  title: 'Contacto | Agenda Demo - Pulse Hub',
  description: 'Agenda una demo personalizada o envíanos un mensaje para explorar cómo Pulse Hub puede transformar tu organización con IA.',
  keywords: ['contacto pulse hub', 'agendar demo IA', 'formulario de contacto', 'programa de alianzas IA'],
};

export default function ContactoPage() {
  return <ContactoClient />;
}
