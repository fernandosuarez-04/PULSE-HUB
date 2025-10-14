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
