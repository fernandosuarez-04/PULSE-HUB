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
