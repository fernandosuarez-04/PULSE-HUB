'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Calendar, Check, Shield, Copy,
  Settings, TrendingUp, Users as UsersIcon
} from 'lucide-react';
import { Navbar, Card, AnimatedSection } from '@/shared/components';
import { cn } from '@/shared/utils/cn';

// Tipos TypeScript
interface Ritual {
  title: string;
  frequency: string;
  description: string;
}

interface Prompt {
  title: string;
  tags: string[];
  text: string;
}

interface Area {
  id: string;
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  prompts: Prompt[];
}

// Datos de rituales
const rituales: Ritual[] = [
  {
    title: 'Daily AI Brief',
    frequency: 'Diario',
    description: '10 minutos diarios con tu AI Buddy para priorizar tareas y recibir insights.'
  },
  {
    title: 'Weekly Sprint Review',
    frequency: 'Semanal',
    description: 'Revisión semanal de logros y automatizaciones aplicadas con el equipo.'
  },
  {
    title: 'Monthly Innovation Lab',
    frequency: 'Mensual',
    description: 'Sesión mensual para explorar nuevas aplicaciones de IA en tu área.'
  }
];

// Datos de áreas y prompts
const areas: Area[] = [
  {
    id: 'operaciones',
    title: 'Operaciones',
    icon: Settings,
    prompts: [
      {
        title: 'Optimizar proceso',
        tags: ['Eficiencia', 'Procesos'],
        text: 'Analiza el siguiente proceso y sugiere 3 optimizaciones específicas considerando tiempo, costos y calidad: [PROCESO]'
      },
      {
        title: 'Generar checklist',
        tags: ['Planificación'],
        text: 'Crea un checklist detallado para [PROCESO] considerando mejores prácticas, riesgos comunes y puntos de control críticos.'
      },
      {
        title: 'Análisis de riesgos',
        tags: ['Gestión'],
        text: 'Identifica riesgos potenciales en [PROYECTO] y propón mitigaciones específicas con nivel de prioridad.'
      }
    ]
  },
  {
    id: 'ventas',
    title: 'Ventas',
    icon: TrendingUp,
    prompts: [
      {
        title: 'Email de seguimiento',
        tags: ['Comunicación'],
        text: 'Redacta un email de seguimiento profesional para [CLIENTE] que retome los puntos clave de nuestra última reunión y proponga próximos pasos.'
      },
      {
        title: 'Propuesta comercial',
        tags: ['Ventas'],
        text: 'Genera una propuesta comercial para [CLIENTE] que incluya diagnóstico, solución propuesta, beneficios y retorno de inversión estimado.'
      },
      {
        title: 'Análisis de objeciones',
        tags: ['Negociación'],
        text: 'Analiza las siguientes objeciones del cliente y sugiere respuestas efectivas con evidencia de valor: [OBJECIONES]'
      }
    ]
  },
  {
    id: 'rrhh',
    title: 'RR.HH.',
    icon: UsersIcon,
    prompts: [
      {
        title: 'Descripción de puesto',
        tags: ['Reclutamiento'],
        text: 'Crea una descripción de puesto para [ROL] que incluya responsabilidades, requisitos, competencias clave y cultura organizacional.'
      },
      {
        title: 'Plan de onboarding',
        tags: ['Formación'],
        text: 'Diseña un plan de onboarding de 30 días para [ROL] con objetivos semanales, recursos necesarios y métricas de éxito.'
      },
      {
        title: 'Evaluación de desempeño',
        tags: ['Evaluación'],
        text: 'Genera preguntas para evaluación de desempeño enfocadas en [COMPETENCIAS] con criterios claros de evaluación.'
      }
    ]
  }
];

export function AdopcionDiariaClient() {
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);

  const handleCopyPrompt = async (text: string, title: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPrompt(title);
      setTimeout(() => setCopiedPrompt(null), 2000);
    } catch (err) {
      console.error('Error copying to clipboard:', err);
    }
  };

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
                {/* Badge Pilar 2 */}
                <motion.div 
                  className="inline-flex items-center gap-2 px-4 py-2 mb-6 
                    bg-[var(--accent-orange)] text-white rounded-full font-medium text-sm"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  Pilar 2
                </motion.div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-[var(--neutral-900)] mb-6">
                  IA en el Día a Día
                </h1>
                
                <p className="text-lg md:text-xl text-[var(--neutral-600)] leading-relaxed">
                  Integra la Inteligencia Artificial en tu día a día con un asistente 
                  personalizado y rutinas efectivas
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Sección AI Buddy & Rituales */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <AnimatedSection animation="slideUp" delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--neutral-900)] text-center mb-4">
                AI Buddy & Rituales
              </h2>
              <p className="text-lg text-[var(--neutral-600)] text-center mb-12 max-w-3xl mx-auto">
                Tu asistente de IA personalizado y rutinas diseñadas para una adopción sostenible
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Tarjeta AI Buddy */}
              <AnimatedSection animation="slideUp" delay={0.15}>
                <Card variant="glass" hover={true} className="h-full flex flex-col p-8">
                  <div className="bg-[var(--accent-orange)]/10 text-[var(--accent-orange)] 
                    p-4 rounded-full mb-6 w-fit">
                    <Sparkles size={32} strokeWidth={2} />
                  </div>
                  <h3 className="text-2xl font-semibold text-[var(--neutral-900)] mb-4">
                    Tu AI Buddy
                  </h3>
                  <p className="text-[var(--neutral-600)] text-lg mb-6 flex-grow">
                    Un asistente de IA personalizado que aprende de tu rol, tus preferencias 
                    y tu contexto organizacional para ofrecerte el soporte más relevante.
                  </p>
                  <ul className="space-y-3 text-[var(--neutral-700)]">
                    <li className="flex items-center gap-3">
                      <Check size={20} className="text-[var(--accent-green)] flex-shrink-0" />
                      <span>Configurado según tu rol y objetivos</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check size={20} className="text-[var(--accent-green)] flex-shrink-0" />
                      <span>Acceso 24/7 desde cualquier dispositivo</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check size={20} className="text-[var(--accent-green)] flex-shrink-0" />
                      <span>Cumplimiento normativo garantizado</span>
                    </li>
                  </ul>
                </Card>
              </AnimatedSection>

              {/* Tarjeta Rituales */}
              <AnimatedSection animation="slideUp" delay={0.2}>
                <Card variant="glass" hover={true} className="h-full flex flex-col p-8">
                  <div className="bg-[var(--primary-100)] text-[var(--primary-600)] 
                    p-4 rounded-full mb-6 w-fit">
                    <Calendar size={32} strokeWidth={2} />
                  </div>
                  <h3 className="text-2xl font-semibold text-[var(--neutral-900)] mb-4">
                    Rituales de Adopción
                  </h3>
                  <p className="text-[var(--neutral-600)] text-lg mb-6">
                    Rutinas diseñadas para integrar la IA de forma natural y efectiva 
                    en tu jornada laboral.
                  </p>
                  <div className="space-y-6 flex-grow">
                    {rituales.map((ritual, idx) => (
                      <div key={idx}>
                        <h4 className="font-semibold text-[var(--neutral-900)] text-lg 
                          flex items-center justify-between mb-1">
                          {ritual.title}
                          <span className="text-[var(--primary-600)] text-sm font-medium 
                            bg-[var(--primary-100)] px-2 py-1 rounded-full">
                            {ritual.frequency}
                          </span>
                        </h4>
                        <p className="text-[var(--neutral-600)] text-base">
                          {ritual.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Biblioteca de Prompts */}
        <section className="py-12 md:py-16 bg-[var(--neutral-100)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <AnimatedSection animation="slideUp" delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--neutral-900)] text-center mb-4">
                Biblioteca de Prompts
              </h2>
              <p className="text-lg text-[var(--neutral-600)] text-center mb-12 max-w-3xl mx-auto">
                Prompts listos para usar, organizados por área funcional
              </p>
            </AnimatedSection>

            {/* Por cada área: Operaciones, Ventas, RR.HH. */}
            {areas.map((area, areaIdx) => (
              <div key={area.id} className="mb-12 last:mb-0">
                <AnimatedSection animation="slideUp" delay={0.1 + areaIdx * 0.05}>
                  <h3 className="text-2xl font-bold text-[var(--neutral-900)] mb-6 flex items-center gap-3">
                    <area.icon size={28} className="text-[var(--primary-600)]" />
                    {area.title}
                  </h3>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {area.prompts.map((prompt, promptIdx) => (
                      <AnimatedSection key={promptIdx} animation="slideUp" 
                        delay={0.15 + promptIdx * 0.05}>
                        <Card hover={true} className="h-full flex flex-col p-6">
                          <h4 className="text-lg font-semibold text-[var(--neutral-900)] mb-2">
                            {prompt.title}
                          </h4>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {prompt.tags.map((tag, tagIdx) => (
                              <span key={tagIdx} 
                                className="text-xs px-2 py-1 bg-[var(--neutral-200)] 
                                text-[var(--neutral-600)] rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex-grow bg-[var(--neutral-100)] p-4 rounded-lg mb-4 
                            text-[var(--neutral-600)] text-sm">
                            {prompt.text}
                          </div>
                          <button 
                            onClick={() => handleCopyPrompt(prompt.text, prompt.title)}
                            className={cn(
                              "flex items-center gap-2 transition-colors",
                              copiedPrompt === prompt.title
                                ? "text-[var(--accent-green)]"
                                : "text-[var(--primary-600)] hover:text-[var(--primary-600)]/80"
                            )}
                          >
                            <Copy size={16} />
                            <span className="text-sm font-medium">
                              {copiedPrompt === prompt.title ? '¡Copiado!' : 'Copiar prompt'}
                            </span>
                          </button>
                        </Card>
                      </AnimatedSection>
                    ))}
                  </div>
                </AnimatedSection>
              </div>
            ))}
          </div>
        </section>

        {/* Aviso de Cumplimiento */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <AnimatedSection animation="slideUp" delay={0.1}>
              <Card className="border-2 border-[var(--primary-600)]/20 bg-[var(--primary-100)]/30">
                <div className="flex items-start gap-4">
                  <div className="bg-[var(--primary-100)] text-[var(--primary-600)] 
                    p-3 rounded-full flex-shrink-0">
                    <Shield size={24} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[var(--neutral-900)] mb-2">
                      Cumplimiento y Seguridad
                    </h3>
                    <p className="text-[var(--neutral-600)] text-base leading-relaxed">
                      Todos los prompts están diseñados considerando la LFPDPPP y mejores 
                      prácticas de seguridad. Evita compartir datos sensibles sin las 
                      protecciones adecuadas.
                    </p>
                  </div>
                </div>
              </Card>
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
