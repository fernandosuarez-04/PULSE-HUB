/**
 * Página: Homepage - Pulse Hub
 * 
 * Documentación de Contexto para Asistentes IA:
 * - Estrategia de Adopción IA: ../../docs/product/ESTRATEGIA-ADOPCION-IA.md
 * - PRD Completo: ../../docs/product/PRD-PULSE-HUB.md
 * - Design System: ../../docs/design/DESIGN-SYSTEM-PROMPT.md
 * - Arquitectura: ../../docs/reference/ARCHITECTURE.md
 * 
 * Esta página implementa: Homepage con Hero, Tres Pilares, Resultados Medibles, Cómo Funciona, Testimonios y CTA Final
 */

'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, GraduationCap, Zap, Settings, 
  TrendingUp, Clock, DollarSign, Users, 
  Search, Palette, Rocket, ChevronLeft, ChevronRight,
  Mail, Linkedin
} from 'lucide-react';
import { Button, Card, WavesSVG, Navbar, ParticlesBackground, AnimatedSection, AnnouncementBanner, Footer } from '@/shared/components';

// Note: AnimatedSection is now imported from shared components

// Counter Animation Component
const CounterAnimation = React.memo(({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) => {
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
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
});

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      quote: 'Pulse Hub transformó nuestra manera de trabajar. En 6 meses, vimos un ROI del 200% y nuestros equipos están más motivados que nunca.',
      author: 'María González',
      role: 'CFO en TechCorp',
    },
    {
      quote: 'La metodología de los tres pilares nos permitió adoptar IA de forma estructurada y con resultados medibles desde el primer mes.',
      author: 'Carlos Ramírez',
      role: 'Director de Transformación Digital',
    },
    {
      quote: 'El enfoque ético y el soporte continuo hicieron la diferencia. Nuestro equipo ahora lidera con IA en lugar de temerla.',
      author: 'Ana Martínez',
      role: 'Directora de RR.HH.',
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* AI Context: Estrategia de Adopción IA - ../../docs/product/ESTRATEGIA-ADOPCION-IA.md */}
      {/* AI Context: PRD Pulse Hub - ../../docs/product/PRD-PULSE-HUB.md */}
      {/* AI Context: Design System - ../../docs/design/DESIGN-SYSTEM-PROMPT.md */}
      {/* AI Context: Esta página implementa la Homepage principal con Hero, Tres Pilares, Resultados y Testimonios */}
      
      <Navbar />
      <AnnouncementBanner />
      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center 
          bg-gradient-to-br from-[#f5f8ff] via-[#fefeff] via-50% to-[#f0f5ff] 
          pt-20 overflow-hidden">
          
          {/* Gradiente radial adicional para profundidad */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] 
            from-[var(--primary-100)]/30 via-transparent to-transparent opacity-50" />
          
          {/* Patrón de puntos */}
          <ParticlesBackground particleCount={60} />
          
          {/* Ondas mejoradas */}
          <WavesSVG className="opacity-70" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge con efecto glassmorphism */}
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 mb-8 
                  bg-white/70 backdrop-blur-md rounded-full 
                  shadow-[0_8px_32px_rgba(31,90,246,0.1)] 
                  border border-white/40
                  ring-1 ring-[var(--primary-600)]/10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Sparkles size={16} className="text-[var(--primary-600)]" />
                <span className="text-[var(--text-sm)] text-[var(--neutral-600)]">
                  Ecosistema de Adopción de IA
                </span>
              </motion.div>

              {/* Main Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--neutral-900)] mb-6">
                IA que impulsa{' '}
                <span className="text-[var(--primary-600)]">liderazgo humano</span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-[var(--neutral-600)] mb-8 max-w-3xl mx-auto leading-relaxed">
                Adopta IA con ética, foco en ROI y hábitos diarios que elevan a tus equipos. 
                Transforma tu organización con nuestros tres pilares probados.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button variant="primary" size="lg" className="text-base">
                  Evaluar mi madurez →
                </Button>
                <Button variant="secondary" size="lg" className="text-base">
                  Ver casos de éxito
                </Button>
              </div>

              {/* Metrics */}
              <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                {[
                  { icon: TrendingUp, text: '+38% eficiencia onboarding' },
                  { icon: Clock, text: '–20% tiempo de ciclo' },
                  { icon: DollarSign, text: 'ROI < 12 meses' },
                ].map((metric, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center gap-2 text-[var(--neutral-600)]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + idx * 0.1, duration: 0.5 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-[var(--accent-green)] bg-opacity-20 flex items-center justify-center">
                      <metric.icon size={16} className="text-[var(--accent-green)]" />
                    </div>
                    <span className="text-sm font-medium">{metric.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tres Pilares Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--neutral-900)] mb-4">
                  Tres Pilares para el Éxito
                </h2>
                <p className="text-lg text-[var(--neutral-600)] max-w-3xl mx-auto">
                  Un enfoque integral que abarca desde la capacitación hasta la automatización, 
                  manteniendo siempre el liderazgo humano en el centro.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Pilar 1 */}
              <AnimatedSection>
                <Card hover className="h-full">
                  <div className="w-16 h-16 rounded-2xl bg-[var(--primary-100)] flex items-center justify-center mb-6">
                    <GraduationCap size={32} className="text-[var(--primary-600)]" />
                  </div>
                  <div className="text-xs font-semibold text-[var(--primary-600)] tracking-wider mb-2">
                    PILAR 1: CAPACITACIÓN
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--neutral-900)] mb-4">
                    IA para Todos
                  </h3>
                  <p className="text-[var(--neutral-600)] mb-6">
                    Capacitación por rol con enfoque en ética y seguridad. Rutas de aprendizaje 
                    adaptadas para dirección, mandos medios y operativos.
                  </p>
                  <ul className="space-y-2 mb-6">
                    {['Formación personalizada por rol', 'Ética y seguridad de datos', 'Certificaciones verificables'].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-[var(--neutral-600)]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary-600)] mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="/capacitacion" className="text-[var(--primary-600)] font-medium hover:underline inline-flex items-center gap-1">
                    Explorar este pilar →
                  </a>
                </Card>
              </AnimatedSection>

              {/* Pilar 2 */}
              <AnimatedSection>
                <Card hover className="h-full">
                  <div className="w-16 h-16 rounded-2xl bg-[#fff4f0] flex items-center justify-center mb-6">
                    <Zap size={32} className="text-[var(--accent-orange)]" />
                  </div>
                  <div className="text-xs font-semibold text-[var(--accent-orange)] tracking-wider mb-2">
                    PILAR 2: ADOPCIÓN DIARIA
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--neutral-900)] mb-4">
                    IA en el Día a Día
                  </h3>
                  <p className="text-[var(--neutral-600)] mb-6">
                    Integra IA en los flujos de trabajo con prompts listos, AI Buddy y rituales 
                    que crean hábitos sostenibles en tus equipos.
                  </p>
                  <ul className="space-y-2 mb-6">
                    {['Biblioteca de prompts por área', 'AI Buddy personalizado', 'Rituales de adopción'].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-[var(--neutral-600)]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-orange)] mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="/adopcion" className="text-[var(--accent-orange)] font-medium hover:underline inline-flex items-center gap-1">
                    Explorar este pilar →
                  </a>
                </Card>
              </AnimatedSection>

              {/* Pilar 3 */}
              <AnimatedSection>
                <Card hover className="h-full">
                  <div className="w-16 h-16 rounded-2xl bg-[#f0fdf7] flex items-center justify-center mb-6">
                    <Settings size={32} className="text-[var(--accent-green)]" />
                  </div>
                  <div className="text-xs font-semibold text-[var(--accent-green)] tracking-wider mb-2">
                    PILAR 3: AUTOMATIZACIÓN
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--neutral-900)] mb-4">
                    Automatización de Alto Impacto
                  </h3>
                  <p className="text-[var(--neutral-600)] mb-6">
                    Priorización impacto-esfuerzo con humano en el bucle. Automatiza procesos 
                    clave manteniendo el control y la gobernanza.
                  </p>
                  <ul className="space-y-2 mb-6">
                    {['Matriz impacto-esfuerzo', 'Gobernanza robusta', 'ROI medible en 12 meses'].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-[var(--neutral-600)]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)] mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="/automatizacion" className="text-[var(--accent-green)] font-medium hover:underline inline-flex items-center gap-1">
                    Explorar este pilar →
                  </a>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Resultados Medibles Section */}
        <section className="py-16 md:py-24 bg-[var(--primary-600)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Resultados Medibles
                </h2>
                <p className="text-lg text-white/90 max-w-3xl mx-auto">
                  Métricas reales de organizaciones que han adoptado IA con Pulse Hub
                </p>
              </div>
            </AnimatedSection>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: TrendingUp, value: 38, suffix: '%', label: 'Eficiencia en onboarding', sublabel: 'Reducción en tiempo de formación de equipos' },
                { icon: Clock, value: 20, suffix: '%', prefix: '–', label: 'Tiempo de ciclo', sublabel: 'Optimización de procesos operativos' },
                { icon: DollarSign, value: 12, suffix: ' meses', prefix: '< ', label: 'ROI', sublabel: 'Retorno de inversión verificable' },
                { icon: Users, value: 95, suffix: '%', label: 'Tasa de adopción', sublabel: 'Equipos comprometidos con IA' },
              ].map((metric, idx) => (
                <AnimatedSection key={idx}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-[var(--radius-lg)] p-8 text-center hover:bg-white/20 transition-all duration-300">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
                      <metric.icon size={32} className="text-white" />
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                      <CounterAnimation target={metric.value} suffix={metric.suffix} prefix={metric.prefix} />
                    </div>
                    <div className="text-xl font-semibold text-white mb-2">
                      {metric.label}
                    </div>
                    <p className="text-sm text-white/80">
                      {metric.sublabel}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Cómo Funciona Section */}
        <section className="py-16 md:py-24 bg-[var(--neutral-100)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--neutral-900)] mb-4">
                  Cómo Funciona
                </h2>
                <p className="text-lg text-[var(--neutral-600)] max-w-3xl mx-auto">
                  Metodología "Ecos" en tres fases: de la evaluación a la transformación completa
                </p>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  number: '01',
                  icon: Search,
                  title: 'Descubrir',
                  description: 'Evaluamos la madurez de tu organización con nuestro test. Identificamos oportunidades de alto impacto y definimos una hoja de ruta personalizada.',
                },
                {
                  number: '02',
                  icon: Palette,
                  title: 'Diseñar',
                  description: 'Co-creamos la estrategia de adopción. Capacitamos a tus equipos, seleccionamos herramientas y establecemos los rituales que generan hábitos sostenibles.',
                },
                {
                  number: '03',
                  icon: Rocket,
                  title: 'Desplegar',
                  description: 'Implementamos las automatizaciones prioritarias con gobernanza robusta. Medimos el impacto, ajustamos y escalamos el éxito en toda tu organización.',
                },
              ].map((step, idx) => (
                <AnimatedSection key={idx}>
                  <Card className="h-full relative overflow-hidden">
                    <div className="text-8xl font-bold text-[var(--neutral-200)] absolute -top-4 -right-4 select-none">
                      {step.number}
                    </div>
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-[var(--primary-100)] flex items-center justify-center mb-6">
                        <step.icon size={28} className="text-[var(--primary-600)]" />
                      </div>
                      <h3 className="text-2xl font-bold text-[var(--neutral-900)] mb-4">
                        {step.title}
                      </h3>
                      <p className="text-[var(--neutral-600)] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonios Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--neutral-900)] mb-4">
                  Lo Que Dicen Nuestros Clientes
                </h2>
                <p className="text-lg text-[var(--neutral-600)] max-w-3xl mx-auto">
                  Testimonios reales de líderes que han transformado sus organizaciones con IA
                </p>
              </div>
            </AnimatedSection>

            <div className="max-w-4xl mx-auto relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="p-8 md:p-12">
                    <div className="text-6xl text-[var(--primary-600)] mb-6">"</div>
                    <p className="text-xl md:text-2xl text-[var(--neutral-900)] mb-8 leading-relaxed">
                      {testimonials[currentTestimonial].quote}
                    </p>
                    <div>
                      <div className="font-bold text-lg text-[var(--neutral-900)]">
                        {testimonials[currentTestimonial].author}
                      </div>
                      <div className="text-[var(--neutral-600)]">
                        {testimonials[currentTestimonial].role}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={prevTestimonial}
                  className="w-12 h-12 rounded-full bg-[var(--neutral-100)] hover:bg-[var(--primary-100)] text-[var(--neutral-600)] hover:text-[var(--primary-600)] transition-colors flex items-center justify-center"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={24} />
                </button>

                <div className="flex gap-2">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentTestimonial(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        idx === currentTestimonial
                          ? 'bg-[var(--primary-600)] w-8'
                          : 'bg-[var(--neutral-300)]'
                      }`}
                      aria-label={`Go to testimonial ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextTestimonial}
                  className="w-12 h-12 rounded-full bg-[var(--neutral-100)] hover:bg-[var(--primary-100)] text-[var(--neutral-600)] hover:text-[var(--primary-600)] transition-colors flex items-center justify-center"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final Section */}
        <section className="py-16 md:py-24 bg-[var(--neutral-900)] text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="text-center max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  Comienza Tu Transformación con IA
                </h2>
                <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                  Evalúa la madurez de tu organización y descubre las oportunidades de alto 
                  impacto que pueden transformar tu negocio.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Button variant="primary" size="lg" className="text-base">
                    📅 Agendar Demo
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="text-base border-white text-white hover:bg-white/10"
                  >
                    Ver Casos de Éxito →
                  </Button>
                </div>

                <p className="text-sm text-white/60">
                  Sin compromiso • Evaluación gratuita • Respuesta en 24h
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
