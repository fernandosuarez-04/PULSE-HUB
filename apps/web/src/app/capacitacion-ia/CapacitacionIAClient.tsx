/**
 * Componente: CapacitacionIAClient - Pilar 1
 * 
 * Documentación de Contexto para Asistentes IA:
 * - Estrategia de Adopción IA: ../../../docs/product/ESTRATEGIA-ADOPCION-IA.md
 * - PRD Completo: ../../../docs/product/PRD-PULSE-HUB.md
 * - Design System: ../../../docs/design/DESIGN-SYSTEM-PROMPT.md
 * 
 * Implementa: Pilar 1 - Capacitación por rol con tabs interactivos
 */

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Users, Wrench, Check, 
  Mail, Linkedin 
} from 'lucide-react';
import { Navbar, Card, AnimatedSection, Footer, AnnouncementBanner } from '@/shared/components';
import { cn } from '@/shared/utils/cn';

// Tipos TypeScript
interface Program {
  id: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  subtitle: string;
  contents: string[];
  duration: string;
  format: string;
  certification: string;
}

// Datos de roles para tabs
const roles = [
  { id: 'direccion', label: 'Dirección', icon: FileText },
  { id: 'mandos-medios', label: 'Mandos Medios', icon: Users },
  { id: 'operativos', label: 'Operativos', icon: Wrench }
];

// Datos completos de programas
const programs: Record<string, Program> = {
  'direccion': {
    id: 'direccion',
    icon: FileText,
    title: 'Dirección',
    subtitle: 'Visión estratégica y toma de decisiones basada en datos',
    contents: [
      'IA como ventaja competitiva',
      'Gobernanza y ética corporativa',
      'ROI y métricas de impacto',
      'Transformación cultural'
    ],
    duration: '8 horas',
    format: 'Híbrido',
    certification: 'Incluida'
  },
  'mandos-medios': {
    id: 'mandos-medios',
    icon: Users,
    title: 'Mandos Medios',
    subtitle: 'Liderazgo de equipos y gestión del cambio',
    contents: [
      'Gestión de proyectos con IA',
      'Prompts efectivos para gestión',
      'Seguimiento y KPIs',
      'Coaching de equipos'
    ],
    duration: '12 horas',
    format: 'Híbrido',
    certification: 'Incluida'
  },
  'operativos': {
    id: 'operativos',
    icon: Wrench,
    title: 'Operativos',
    subtitle: 'Herramientas prácticas para el día a día',
    contents: [
      'Automatización de tareas repetitivas',
      'Biblioteca de prompts por área',
      'Seguridad y privacidad de datos',
      'Colaboración con IA'
    ],
    duration: '16 horas',
    format: 'Presencial + Online',
    certification: 'Incluida'
  }
};

// Datos KPIs
const kpis = [
  { value: '95%', label: 'Tasa de completitud' },
  { value: '4.7/5', label: 'Satisfacción media' },
  { value: '82%', label: 'Aplicación inmediata' }
];

export function CapacitacionIAClient() {
  const [activeRole, setActiveRole] = useState<'direccion' | 'mandos-medios' | 'operativos'>('direccion');
  
  const currentProgram = programs[activeRole];

  return (
    <>
      {/* AI Context: Estrategia de Adopción IA - ../../../docs/product/ESTRATEGIA-ADOPCION-IA.md */}
      {/* AI Context: PRD Pulse Hub - ../../../docs/product/PRD-PULSE-HUB.md */}
      {/* AI Context: Esta página implementa Pilar 1 - Capacitación IA por rol */}
      
      <Navbar />
      <AnnouncementBanner />
      
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center 
          bg-gradient-to-b from-[#f5f8ff] to-white pt-32 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="max-w-4xl mx-auto text-center">
                {/* Badge Pilar 1 */}
                <motion.div 
                  className="inline-flex items-center gap-2 px-4 py-2 mb-6 
                    bg-[var(--primary-600)] text-white rounded-full font-medium text-sm"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  Pilar 1
                </motion.div>
                
                {/* Título */}
                <h1 className="text-4xl md:text-5xl font-bold text-[var(--neutral-900)] mb-6">
                  IA para Todos
                </h1>
                
                {/* Subtítulo */}
                <p className="text-lg md:text-xl text-[var(--neutral-600)] leading-relaxed">
                  Capacitación personalizada por rol con enfoque en ética, seguridad 
                  y resultados medibles
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Sistema de Tabs (Roles) */}
        <section className="py-4 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              {roles.map((role) => (
                <motion.button
                  key={role.id}
                  onClick={() => setActiveRole(role.id as any)}
                  className={cn(
                    "flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-200",
                    activeRole === role.id
                      ? "bg-[var(--primary-100)] text-[var(--primary-600)] ring-2 ring-[var(--primary-600)]"
                      : "bg-white text-[var(--neutral-600)] hover:bg-[var(--neutral-100)] border border-[var(--neutral-200)]"
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <role.icon size={20} />
                  <span className="font-medium">{role.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Card de Programa Dinámico */}
        <section className="py-6 md:py-8 bg-[var(--neutral-100)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRole}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full flex justify-center"
              >
                <Card className="w-full max-w-4xl mx-auto">
                  {/* Header */}
                  <div className="flex items-start gap-6 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-[var(--primary-100)] 
                      flex items-center justify-center flex-shrink-0">
                      <currentProgram.icon size={32} className="text-[var(--primary-600)]" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-[var(--neutral-900)] mb-2">
                        {currentProgram.title}
                      </h2>
                      <p className="text-lg text-[var(--neutral-600)]">
                        {currentProgram.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Grid: Contenidos + Detalles */}
                  <div className="grid md:grid-cols-[2fr_1fr] gap-8">
                    {/* Contenidos del programa */}
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--neutral-900)] mb-4">
                        Contenidos del programa:
                      </h3>
                      <ul className="space-y-3">
                        {currentProgram.contents.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <Check size={20} className="text-[var(--accent-green)] flex-shrink-0 mt-0.5" />
                            <span className="text-[var(--neutral-900)]">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Detalles */}
                    <div className="space-y-6">
                      <div>
                        <p className="text-sm text-[var(--neutral-600)] mb-1">Duración</p>
                        <p className="text-lg font-bold text-[var(--neutral-900)]">
                          {currentProgram.duration}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-[var(--neutral-600)] mb-1">Formato</p>
                        <p className="text-lg font-bold text-[var(--neutral-900)]">
                          {currentProgram.format}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-[var(--neutral-600)] mb-1">Certificación</p>
                        <p className="text-lg font-bold text-[var(--neutral-900)]">
                          {currentProgram.certification}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Sección KPIs */}
        <section className="py-16 md:py-24 bg-[var(--primary-600)] text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Resultados Verificables
                </h2>
                <p className="text-lg opacity-90">
                  KPIs que medimos en cada programa de capacitación
                </p>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {kpis.map((kpi, idx) => (
                <AnimatedSection key={idx} delay={0.1 + idx * 0.1}>
                  <Card className="text-center bg-white/10 backdrop-blur-sm border-white/20">
                    <div className="text-4xl md:text-5xl font-bold mb-2">
                      {kpi.value}
                    </div>
                    <p className="text-lg opacity-90">{kpi.label}</p>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
