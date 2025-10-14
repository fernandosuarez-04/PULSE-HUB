/**
 * Componente: CasosDeExitoClient
 * 
 * Documentación de Contexto para Asistentes IA:
 * - Estrategia de Adopción IA: ../../../docs/product/ESTRATEGIA-ADOPCION-IA.md
 * - PRD Completo: ../../../docs/product/PRD-PULSE-HUB.md
 * - Design System: ../../../docs/design/DESIGN-SYSTEM-PROMPT.md
 * 
 * Implementa: Casos de éxito con filtros por industria y resultados medibles
 */

'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, TrendingUp, DollarSign, CheckCircle, Users } from 'lucide-react';
import { Navbar, AnimatedSection, Card, Footer, AnnouncementBanner } from '@/shared/components';
import { cn } from '@/shared/utils/cn';

// Tipos TypeScript
interface Metrica {
  label: string;
  valor: string;
  icono: 'Clock' | 'TrendingUp' | 'DollarSign' | 'CheckCircle' | 'Users';
}

interface Caso {
  id: string;
  titulo: string;
  industria: 'Tecnología' | 'Financiero' | 'Consultoría';
  pilar: 1 | 2 | 3;
  problema: string;
  solucion: string;
  metricas: Metrica[];
  leccionesAprendidas: string;
}

type IndustriaFilter = 'Todos' | 'Tecnología' | 'Financiero' | 'Consultoría';
type PilarFilter = 'Todos' | 'Pilar 1' | 'Pilar 2' | 'Pilar 3';

// Datos de casos (3 mínimos para V1)
const casos: Caso[] = [
  {
    id: 'caso-1',
    titulo: 'Automatización de Onboarding en TechCorp',
    industria: 'Tecnología',
    pilar: 3,
    problema: 'Proceso de onboarding manual que tomaba 3 semanas y requería 40 horas de RR.HH.',
    solucion: 'Implementación de IA para generar materiales personalizados, asignación automática de tareas y seguimiento adaptativo.',
    metricas: [
      { label: 'Tiempo reducido', valor: '-60%', icono: 'Clock' },
      { label: 'Satisfacción', valor: '+45%', icono: 'TrendingUp' },
      { label: 'ROI', valor: '8 meses', icono: 'DollarSign' }
    ],
    leccionesAprendidas: 'La personalización por rol fue clave. El humano en el bucle aseguró calidad.'
  },
  {
    id: 'caso-2',
    titulo: 'Capacitación IA en SecureBank',
    industria: 'Financiero',
    pilar: 1,
    problema: 'Resistencia al cambio y falta de confianza en IA por parte de mandos medios.',
    solucion: 'Programa de capacitación de 12 semanas con enfoque en ética, seguridad y casos de uso específicos del sector.',
    metricas: [
      { label: 'Adopción', valor: '95%', icono: 'TrendingUp' },
      { label: 'Completitud', valor: '92%', icono: 'CheckCircle' },
      { label: 'ROI', valor: '6 meses', icono: 'DollarSign' }
    ],
    leccionesAprendidas: 'La transparencia sobre limitaciones de IA generó más confianza que promesas exageradas.'
  },
  {
    id: 'caso-3',
    titulo: 'AI Buddy para Ventas en InnovateLab',
    industria: 'Consultoría',
    pilar: 2,
    problema: 'Equipo de ventas desbordado con seguimiento manual de leads y propuestas repetitivas.',
    solucion: 'AI Buddy personalizado con biblioteca de prompts para emails, propuestas y análisis de objeciones.',
    metricas: [
      { label: 'Productividad', valor: '+38%', icono: 'TrendingUp' },
      { label: 'Tiempo de respuesta', valor: '-50%', icono: 'Clock' },
      { label: 'Conversión', valor: '+22%', icono: 'DollarSign' }
    ],
    leccionesAprendidas: 'Los rituales diarios fueron esenciales para crear el hábito de uso del AI Buddy.'
  }
];

// Helper para obtener icono
const getIcon = (iconName: string) => {
  const icons = { Clock, TrendingUp, DollarSign, CheckCircle, Users };
  return icons[iconName as keyof typeof icons] || TrendingUp;
};

// Helper para obtener color de badge de pilar
const getPilarColor = (pilar: number) => {
  switch(pilar) {
    case 1: return 'bg-[var(--primary-600)] text-white';
    case 2: return 'bg-[var(--accent-orange)] text-white';
    case 3: return 'bg-[var(--accent-green)] text-white';
    default: return 'bg-[var(--primary-600)] text-white';
  }
};

export function CasosDeExitoClient() {
  const [industriaFilter, setIndustriaFilter] = useState<IndustriaFilter>('Todos');
  const [pilarFilter, setPilarFilter] = useState<PilarFilter>('Todos');

  const casosFiltrados = useMemo(() => {
    return casos.filter((caso) => {
      const matchIndustria = industriaFilter === 'Todos' || caso.industria === industriaFilter;
      const matchPilar = pilarFilter === 'Todos' || `Pilar ${caso.pilar}` === pilarFilter;
      return matchIndustria && matchPilar;
    });
  }, [industriaFilter, pilarFilter]);

  return (
    <>
      {/* AI Context: Estrategia de Adopción IA - ../../../docs/product/ESTRATEGIA-ADOPCION-IA.md */}
      {/* AI Context: PRD Pulse Hub - ../../../docs/product/PRD-PULSE-HUB.md */}
      {/* AI Context: Esta página muestra casos de éxito con filtros por industria y pilar */}
      
      <Navbar />
      <AnnouncementBanner />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 bg-gradient-to-br from-[#f5f8ff] via-[#fefeff] to-[#f0f5ff] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] 
            from-[var(--primary-100)]/30 via-transparent to-transparent opacity-50" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <AnimatedSection>
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-[var(--neutral-900)] mb-6">
                  Casos de Éxito
                </h1>
                <p className="text-lg md:text-xl text-[var(--neutral-600)] leading-relaxed">
                  Descubre cómo organizaciones han transformado sus procesos con nuestros tres pilares
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Filtros */}
        <section className="py-8 bg-white border-b border-[var(--neutral-200)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-6">
              {/* Título centrado */}
              <span className="font-medium text-[var(--neutral-900)] text-center">Filtrar por:</span>
              
              {/* Contenedor de filtros centrado */}
              <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
                {/* Filtros de Industria */}
                <div className="flex flex-col items-center gap-3">
                  <span className="text-sm text-[var(--neutral-600)] font-medium">Industria:</span>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['Todos', 'Tecnología', 'Financiero', 'Consultoría'].map((industria) => (
                      <button
                        key={industria}
                        onClick={() => setIndustriaFilter(industria as IndustriaFilter)}
                        className={cn(
                          "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                          industriaFilter === industria
                            ? "bg-[var(--primary-600)] text-white shadow-md"
                            : "bg-[var(--neutral-100)] text-[var(--neutral-600)] hover:bg-[var(--primary-100)] hover:text-[var(--primary-600)]"
                        )}
                      >
                        {industria}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filtros de Pilar */}
                <div className="flex flex-col items-center gap-3">
                  <span className="text-sm text-[var(--neutral-600)] font-medium">Pilar:</span>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['Todos', 'Pilar 1', 'Pilar 2', 'Pilar 3'].map((pilar) => (
                      <button
                        key={pilar}
                        onClick={() => setPilarFilter(pilar as PilarFilter)}
                        className={cn(
                          "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                          pilarFilter === pilar
                            ? "bg-[var(--primary-600)] text-white shadow-md"
                            : "bg-[var(--neutral-100)] text-[var(--neutral-600)] hover:bg-[var(--primary-100)] hover:text-[var(--primary-600)]"
                        )}
                      >
                        {pilar}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Grid de Casos */}
        <section className="py-12 md:py-16 bg-[var(--neutral-100)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <AnimatePresence mode="wait">
              {casosFiltrados.length === 0 ? (
                /* Estado Vacío */
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-xl p-12 text-center shadow-[var(--shadow-base)]"
                >
                  <p className="text-lg text-[var(--neutral-600)]">
                    No se encontraron casos con los filtros seleccionados.
                  </p>
                </motion.div>
              ) : (
                /* Grid de Cards */
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  {casosFiltrados.map((caso, index) => (
                    <motion.div
                      key={caso.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                    >
                      <Card hover={true} className="p-8">
                        {/* Badges */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-sm font-medium",
                            getPilarColor(caso.pilar)
                          )}>
                            Pilar {caso.pilar}
                          </span>
                          <span className="px-3 py-1 rounded-full text-sm font-medium 
                            bg-white border border-[var(--neutral-200)] text-[var(--neutral-600)]">
                            {caso.industria}
                          </span>
                        </div>

                        {/* Título */}
                        <h3 className="text-2xl font-bold text-[var(--neutral-900)] mb-6">
                          {caso.titulo}
                        </h3>

                        {/* Grid: Contenido + Métricas */}
                        <div className="grid md:grid-cols-3 gap-8">
                          {/* Columna Izquierda: Problema, Solución, Lecciones */}
                          <div className="md:col-span-2 space-y-6">
                            <div>
                              <h4 className="font-semibold text-[var(--neutral-900)] mb-2">
                                Problema
                              </h4>
                              <p className="text-[var(--neutral-600)]">
                                {caso.problema}
                              </p>
                            </div>

                            <div>
                              <h4 className="font-semibold text-[var(--neutral-900)] mb-2">
                                Solución
                              </h4>
                              <p className="text-[var(--neutral-600)]">
                                {caso.solucion}
                              </p>
                            </div>

                            <div>
                              <h4 className="font-semibold text-[var(--neutral-900)] mb-2">
                                Lecciones Aprendidas
                              </h4>
                              <p className="text-[var(--neutral-600)]">
                                {caso.leccionesAprendidas}
                              </p>
                            </div>
                          </div>

                          {/* Columna Derecha: Métricas */}
                          <div className="space-y-4">
                            <h4 className="font-semibold text-[var(--neutral-900)] mb-4">
                              Métricas
                            </h4>
                            {caso.metricas.map((metrica, idx) => {
                              const Icon = getIcon(metrica.icono);
                              return (
                                <div
                                  key={idx}
                                  className="bg-[var(--primary-100)]/50 rounded-lg p-4 
                                    flex items-center gap-3"
                                >
                                  <Icon 
                                    size={24} 
                                    className="text-[var(--primary-600)] flex-shrink-0" 
                                  />
                                  <div className="flex-grow">
                                    <p className="text-sm text-[var(--neutral-600)]">
                                      {metrica.label}
                                    </p>
                                    <p className="text-2xl font-bold text-[var(--primary-600)]">
                                      {metrica.valor}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-12 md:py-16 bg-white text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <AnimatedSection variant="slideUp" delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--neutral-900)] mb-6">
                ¿Quieres tu propio caso de éxito?
              </h2>
              <p className="text-lg text-[var(--neutral-600)] mb-8">
                Descubre cómo podemos ayudarte a transformar tu organización con IA ética y efectiva.
              </p>
              <button className="inline-flex items-center gap-2 px-8 py-3 rounded-[var(--radius-base)] 
                bg-[var(--accent-orange)] text-white font-medium transition-all duration-[var(--duration-base)]
                hover:bg-[var(--accent-orange)]/90 hover:shadow-lg">
                Agendar Demo
              </button>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
