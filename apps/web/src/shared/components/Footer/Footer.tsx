import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--neutral-900)] text-white py-12 border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <Image
                src="/pulse-hub-logo.png"
                alt="Pulse Hub Logo"
                width={150}
                height={35}
                className="w-auto h-8"
              />
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Ecosistema humano-tecnológico para la adopción ética y efectiva de IA en empresas.
            </p>
          </div>

          {/* Nuestros Pilares */}
          <div>
            <h4 className="font-semibold mb-4">Nuestros Pilares</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/capacitacion-ia" className="text-sm text-white/70 hover:text-white transition-colors">
                  Capacitación IA
                </Link>
              </li>
              <li>
                <Link href="/adopcion-diaria" className="text-sm text-white/70 hover:text-white transition-colors">
                  Adopción Diaria
                </Link>
              </li>
              <li>
                <Link href="/automatizacion" className="text-sm text-white/70 hover:text-white transition-colors">
                  Automatización
                </Link>
              </li>
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h4 className="font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/casos-de-exito" className="text-sm text-white/70 hover:text-white transition-colors">
                  Casos de Éxito
                </Link>
              </li>
              <li>
                <Link href="/recursos" className="text-sm text-white/70 hover:text-white transition-colors">
                  AI Academy
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-sm text-white/70 hover:text-white transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contacto" className="text-sm text-white/70 hover:text-white transition-colors">
                  Agendar Demo
                </Link>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Mail size={16} />
                <a href="mailto:contacto@pulsehub.com" className="hover:text-white transition-colors">
                  contacto@pulsehub.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/ecos-de-liderazgo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Linkedin size={16} />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/60">
            © 2025 Pulse Hub. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link href="/sobre" className="text-sm text-white/60 hover:text-white transition-colors">
              Privacidad
            </Link>
            <Link href="/sobre" className="text-sm text-white/60 hover:text-white transition-colors">
              Términos
            </Link>
            <Link href="/sobre" className="text-sm text-white/60 hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
