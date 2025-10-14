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
