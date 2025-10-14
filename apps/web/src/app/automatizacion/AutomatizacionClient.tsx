'use client';

import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Target, TrendingUp, Shield } from 'lucide-react';
import { Navbar, Card, AnimatedSection, Button } from '@/shared/components';
import Footer from '@/shared/components/Footer/Footer';
import { cn } from '@/shared/utils/cn';

// Tipos TypeScript
interface Proceso {
  nombre: string;
  impacto: 'Alto' | 'Medio';
  esfuerzo: 'Bajo' | 'Medio' | 'Alto';
  roi: string;
}

interface GobernanzaItem {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
}

interface KPI {
  value: number;
  unit: string;
  description: string;
  prefix?: string;
}

// Datos de Matriz Impacto-Esfuerzo
const procesos: Proceso[] = [
  {
    nombre: 'Clasificación de emails',
    impacto: 'Alto',
    esfuerzo: 'Bajo',
    roi: '6 meses'
  },
  {
    nombre: 'Generación de reportes',
    impacto: 'Alto',
    esfuerzo: 'Medio',
    roi: '8 meses'
  },
  {
    nombre: 'Onboarding automatizado',
    impacto: 'Alto',
    esfuerzo: 'Alto',
    roi: '12 meses'
  },
  {
    nombre: 'Chatbot de soporte',
    impacto: 'Medio',
    esfuerzo: 'Medio',
    roi: '10 meses'
  }
];

// Datos de Gobernanza
const gobernanza: GobernanzaItem[] = [
  {
    icon: Target,
    title: 'Humano en el Bucle',
    description: 'Toda decisión crítica requiere validación humana. La IA sugiere, las personas deciden.'
  },
  {
    icon: TrendingUp,
    title: 'Medición Continua',
    description: 'KPIs claros desde el día uno. Medimos impacto, precisión y satisfacción de usuarios.'
  },
  {
    icon: Shield,
    title: 'Privacidad por Diseño',
    description: 'Cumplimiento de LFPDPPP, encriptación de datos y auditorías regulares.'
  }
];

// Datos de KPIs
const kpis: KPI[] = [
  { value: 12, unit: ' meses', description: 'ROI medio', prefix: '< ' },
  { value: 35, unit: '%', description: 'Reducción de tiempo', prefix: '-' },
  { value: 99.2, unit: '%', description: 'Precisión de automatizaciones' }
];

// Función helper para obtener color de badge
const getBadgeColor = (type: 'impacto' | 'esfuerzo', value: string) => {
  if (type === 'impacto') {
    return value === 'Alto' 
      ? 'bg-[var(--accent-green)]/20 text-[var(--accent-green)]' 
      : 'bg-[var(--neutral-200)] text-[var(--neutral-600)]';
  }
  // esfuerzo
  if (value === 'Bajo') return 'bg-[var(--accent-green)]/20 text-[var(--accent-green)]';
  if (value === 'Medio') return 'bg-[var(--accent-orange)]/20 text-[var(--accent-orange)]';
  return 'bg-[var(--neutral-200)] text-[var(--neutral-600)]';
};

// Componente CounterAnimation (reutilizado de Capacitación IA)
const CounterAnimation = ({ target, suffix = '', prefix = '' }: { 
  target: number; 
  suffix?: string; 
  prefix?: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current * 10) / 10); // Para decimales
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

export function AutomatizacionClient() {
  return (
    <>
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center 
          bg-gradient-to-br from-[#f5f8ff] via-[#fefeff] to-[#f0f5ff] pt-32 pb-16 overflow-hidden">
          
          {/* Gradiente radial para profundidad */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] 
            from-[var(--primary-100)]/30 via-transparent to-transparent opacity-50" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <AnimatedSection>
              <div className="max-w-4xl mx-auto text-center">
                {/* Badge Pilar 3 - Verde/Teal para diferenciación */}
                <motion.div 
                  className="inline-flex items-center gap-2 px-4 py-2 mb-6 
                    bg-[var(--accent-green)] text-white rounded-full font-medium text-sm"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  Pilar 3
                </motion.div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-[var(--neutral-900)] mb-6">
                  Automatización de Alto Impacto
                </h1>
                
                <p className="text-lg md:text-xl text-[var(--neutral-600)] leading-relaxed">
                  Prioriza, automatiza y gobierna con humano en el bucle y ROI medible en menos de 12 meses
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Matriz Impacto-Esfuerzo */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <AnimatedSection animation="slideUp" delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--neutral-900)] text-center mb-4">
                Matriz Impacto-Esfuerzo
              </h2>
              <p className="text-lg text-[var(--neutral-600)] text-center mb-12 max-w-3xl mx-auto">
                Priorizamos automatizaciones según su potencial de ROI y complejidad de implementación
              </p>
            </AnimatedSection>

            <AnimatedSection animation="slideUp" delay={0.2}>
              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-xl overflow-hidden shadow-[var(--shadow-md)]">
                  {/* Table Header */}
                  <thead>
                    <tr className="bg-[var(--primary-600)] text-white">
                      <th className="px-6 py-4 text-left font-semibold">Proceso</th>
                      <th className="px-6 py-4 text-center font-semibold">Impacto</th>
                      <th className="px-6 py-4 text-center font-semibold">Esfuerzo</th>
                      <th className="px-6 py-4 text-center font-semibold">ROI Estimado</th>
                    </tr>
                  </thead>
                  
                  {/* Table Body */}
                  <tbody>
                    {procesos.map((proceso, index) => (
                      <motion.tr
                        key={index}
                        className="border-b border-[var(--neutral-200)] last:border-b-0 
                          hover:bg-[var(--primary-100)]/30 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                      >
                        <td className="px-6 py-4 font-medium text-[var(--neutral-900)]">
                          {proceso.nombre}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={cn(
                            "inline-block px-3 py-1 rounded-full text-sm font-medium",
                            getBadgeColor('impacto', proceso.impacto)
                          )}>
                            {proceso.impacto}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={cn(
                            "inline-block px-3 py-1 rounded-full text-sm font-medium",
                            getBadgeColor('esfuerzo', proceso.esfuerzo)
                          )}>
                            {proceso.esfuerzo}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center text-[var(--neutral-900)] font-medium">
                          {proceso.roi}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Gobernanza Robusta */}
        <section className="py-12 md:py-16 bg-[var(--neutral-100)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <AnimatedSection animation="slideUp" delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--neutral-900)] text-center mb-12">
                Gobernanza Robusta
              </h2>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-8">
              {gobernanza.map((item, index) => (
                <AnimatedSection key={index} animation="slideUp" delay={0.15 + index * 0.1}>
                  <Card hover={true} className="h-full flex flex-col p-8 text-center">
                    <div className="bg-[var(--accent-green)]/10 text-[var(--accent-green)] 
                      p-4 rounded-full mb-6 w-fit mx-auto">
                      <item.icon size={32} strokeWidth={2} />
                    </div>
                    <h3 className="text-xl font-semibold text-[var(--neutral-900)] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-[var(--neutral-600)] text-base flex-grow">
                      {item.description}
                    </p>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Resultados Medibles */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection animation="slideUp" delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--neutral-900)] mb-4">
                Resultados Medibles
              </h2>
              <p className="text-lg text-[var(--neutral-600)] max-w-3xl mx-auto mb-12">
                Impacto tangible de la automatización inteligente en tu organización
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {kpis.map((kpi, index) => (
                <AnimatedSection key={index} animation="slideUp" delay={0.15 + index * 0.1}>
                  <Card 
                    variant="glass" 
                    className="p-8 flex flex-col items-center text-center h-full 
                      border-2 border-[var(--accent-green)]/30"
                  >
                    <p className="text-5xl font-bold text-[var(--accent-green)] mb-3">
                      <CounterAnimation 
                        target={kpi.value} 
                        prefix={kpi.prefix} 
                        suffix={kpi.unit} 
                      />
                    </p>
                    <p className="text-lg text-[var(--neutral-600)]">{kpi.description}</p>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-12 md:py-16 bg-[var(--neutral-100)] text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <AnimatedSection animation="slideUp" delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--neutral-900)] mb-6">
                ¿Listo para Automatizar?
              </h2>
              <p className="text-lg text-[var(--neutral-600)] mb-8">
                Descubre cómo la automatización inteligente puede transformar tu operación con ROI medible.
              </p>
              <Button variant="primary" size="lg">
                Agendar Demo
              </Button>
            </AnimatedSection>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[var(--neutral-900)] text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              {/* Logo y descripción */}
              <div className="md:col-span-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[var(--primary-600)] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">PH</span>
                  </div>
                  <span className="text-xl font-bold">Pulse Hub</span>
                </div>
                <p className="text-[var(--neutral-200)] text-sm leading-relaxed">
                  Ecosistema humano-tecnológico para la adopción ética y efectiva de IA en empresas.
                </p>
              </div>

              {/* Nuestros Pilares */}
              <div>
                <h3 className="font-semibold mb-4">Nuestros Pilares</h3>
                <ul className="space-y-2 text-sm text-[var(--neutral-200)]">
                  <li><a href="/capacitacion-ia" className="hover:text-white transition-colors">Capacitación IA</a></li>
                  <li><a href="/adopcion-diaria" className="hover:text-white transition-colors">Adopción Diaria</a></li>
                  <li><a href="/automatizacion" className="hover:text-white transition-colors">Automatización</a></li>
                </ul>
              </div>

              {/* Recursos */}
              <div>
                <h3 className="font-semibold mb-4">Recursos</h3>
                <ul className="space-y-2 text-sm text-[var(--neutral-200)]">
                  <li><a href="/casos-de-exito" className="hover:text-white transition-colors">Casos de Éxito</a></li>
                  <li><a href="/recursos" className="hover:text-white transition-colors">AI Academy</a></li>
                  <li><a href="/sobre" className="hover:text-white transition-colors">Sobre Nosotros</a></li>
                </ul>
              </div>

              {/* Contacto */}
              <div>
                <h3 className="font-semibold mb-4">Contacto</h3>
                <ul className="space-y-2 text-sm text-[var(--neutral-200)]">
                  <li><a href="/contacto" className="hover:text-white transition-colors">Agendar Demo</a></li>
                  <li><a href="mailto:contacto@pulsehub.com" className="hover:text-white transition-colors">contacto@pulsehub.com</a></li>
                  <li>
                    <a href="https://linkedin.com/company/pulsehub" target="_blank" rel="noopener noreferrer" 
                       className="hover:text-white transition-colors flex items-center gap-2">
                      <span>LinkedIn</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-[var(--neutral-700)] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-[var(--neutral-200)]">
                © 2025 Pulse Hub. Todos los derechos reservados.
              </p>
              <div className="flex gap-6 text-sm text-[var(--neutral-200)]">
                <a href="/privacidad" className="hover:text-white transition-colors">Privacidad</a>
                <a href="/terminos" className="hover:text-white transition-colors">Términos</a>
                <a href="/cookies" className="hover:text-white transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
