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
