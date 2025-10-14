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
