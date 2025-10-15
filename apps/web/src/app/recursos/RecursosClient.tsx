/**
 * Componente: RecursosClient - AI Academy
 * 
 * Documentación de Contexto para Asistentes IA:
 * - Estrategia de Adopción IA: ../../../docs/product/ESTRATEGIA-ADOPCION-IA.md
 * - PRD Completo: ../../../docs/product/PRD-PULSE-HUB.md
 * - Design System: ../../../docs/design/DESIGN-SYSTEM-PROMPT.md
 * 
 * Implementa: AI Academy con cursos, guías descargables y biblioteca de prompts
 */

'use client';

import React from 'react';
import { GraduationCap, BookOpen, Clock, Download } from 'lucide-react';
import { Navbar, AnimatedSection, Card, Footer, AnnouncementBanner } from '@/shared/components';
import { cn } from '@/shared/utils/cn';

// Tipos TypeScript
interface Curso {
  id: string;
  titulo: string;
  nivel: 'Básico' | 'Intermedio' | 'Avanzado';
  descripcion: string;
  duracion: string;
  icono: string;
}

interface Guia {
  id: string;
  titulo: string;
  tipo: 'PDF' | 'Documento' | 'Excel';
  descripcion: string;
  url: string;
}

// Colores para badges de nivel
const nivelColors: { [key: string]: string } = {
  'Básico': 'bg-[var(--accent-green)] text-white',
  'Intermedio': 'bg-[var(--accent-orange)] text-white',
  'Avanzado': 'bg-[var(--primary-600)] text-white'
};

// Datos de cursos (3 mínimos para V1)
const cursos: Curso[] = [
  {
    id: 'curso-1',
    titulo: 'Fundamentos de IA para Líderes',
    nivel: 'Básico',
    descripcion: 'Comprende los conceptos clave de IA, casos de uso y cómo evaluar oportunidades en tu organización.',
    duracion: '4 horas',
    icono: 'GraduationCap'
  },
  {
    id: 'curso-2',
    titulo: 'Prompts Efectivos para Gestión',
    nivel: 'Intermedio',
    descripcion: 'Domina el arte del prompting para gestión de equipos, proyectos y toma de decisiones.',
    duracion: '6 horas',
    icono: 'GraduationCap'
  },
  {
    id: 'curso-3',
    titulo: 'Gobernanza y Ética en IA',
    nivel: 'Avanzado',
    descripcion: 'Implementa marcos de gobernanza robustos y navega dilemas éticos en proyectos de IA.',
    duracion: '8 horas',
    icono: 'GraduationCap'
  }
];

// Datos de guías descargables (3 mínimos para V1)
const guias: Guia[] = [
  {
    id: 'guia-1',
    titulo: 'Guía de Cumplimiento LFPDPPP en IA',
    tipo: 'PDF',
    descripcion: 'Checklist completo para asegurar el cumplimiento normativo en proyectos de IA.',
    url: '/recursos/guia-cumplimiento-lfpdppp.pdf'
  },
  {
    id: 'guia-2',
    titulo: 'Política de IA Empresarial',
    tipo: 'Documento',
    descripcion: 'Plantilla adaptable para crear la política de uso de IA en tu organización.',
    url: '/recursos/politica-ia-empresarial.docx'
  },
  {
    id: 'guia-3',
    titulo: 'Matriz de Evaluación de Riesgos',
    tipo: 'Excel',
    descripcion: 'Herramienta para identificar y mitigar riesgos en automatizaciones con IA.',
    url: '/recursos/matriz-evaluacion-riesgos.xlsx'
  }
];

export function RecursosClient() {
  return (
    <>
      {/* AI Context: Estrategia de Adopción IA - ../../../docs/product/ESTRATEGIA-ADOPCION-IA.md */}
      {/* AI Context: PRD Pulse Hub - ../../../docs/product/PRD-PULSE-HUB.md */}
      {/* AI Context: Esta página implementa AI Academy con cursos, guías y biblioteca de prompts */}
      
      <Navbar />
      <AnnouncementBanner />
      
      <main>
        {/* Hero Section - AI Academy */}
        <section className="relative pt-32 pb-16 bg-gradient-to-br from-[#f5f8ff] via-[#fefeff] to-[#f0f5ff] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] 
            from-[var(--primary-100)]/30 via-transparent to-transparent opacity-50" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <AnimatedSection>
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-[var(--neutral-900)] mb-6">
                  AI Academy
                </h1>
                <p className="text-lg md:text-xl text-[var(--neutral-600)] leading-relaxed">
                  Recursos, cursos y guías para profundizar en la adopción de IA
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Cursos Disponibles */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <AnimatedSection variant="slideUp" delay={0.1}>
              <div className="flex items-center gap-3 mb-8">
                <GraduationCap size={32} className="text-[var(--primary-600)]" />
                <h2 className="text-3xl font-bold text-[var(--neutral-900)]">
                  Cursos Disponibles
                </h2>
              </div>
            </AnimatedSection>

            <div className="space-y-6">
              {cursos.map((curso, index) => (
                <AnimatedSection key={curso.id} variant="slideUp" delay={0.15 + index * 0.1}>
                  <Card hover={true} className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                      {/* Contenido del Curso */}
                      <div className="flex-grow space-y-3">
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-bold text-[var(--neutral-900)]">
                            {curso.titulo}
                          </h3>
                          <span className={cn(
                            "px-3 py-1 rounded-full text-sm font-medium",
                            nivelColors[curso.nivel]
                          )}>
                            {curso.nivel}
                          </span>
                        </div>
                        <p className="text-[var(--neutral-600)]">
                          {curso.descripcion}
                        </p>
                        <div className="flex items-center gap-2 text-[var(--neutral-600)]">
                          <Clock size={18} />
                          <span className="text-sm">{curso.duracion}</span>
                        </div>
                      </div>

                      {/* Botón Inscribirse */}
                      <div className="md:flex-shrink-0">
                        <button className="w-full md:w-auto px-6 py-3 rounded-[var(--radius-base)] 
                          bg-[var(--primary-600)] text-white font-medium
                          transition-all duration-[var(--duration-base)]
                          hover:bg-[var(--primary-600)]/90 hover:shadow-md">
                          Inscribirse
                        </button>
                      </div>
                    </div>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Guías Descargables */}
        <section className="py-12 md:py-16 bg-[var(--neutral-100)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <AnimatedSection variant="slideUp" delay={0.1}>
              <div className="flex items-center gap-3 mb-8">
                <BookOpen size={32} className="text-[var(--primary-600)]" />
                <h2 className="text-3xl font-bold text-[var(--neutral-900)]">
                  Guías Descargables
                </h2>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guias.map((guia, index) => (
                <AnimatedSection key={guia.id} variant="slideUp" delay={0.15 + index * 0.1}>
                  <Card hover={true} className="h-full flex flex-col p-6">
                    {/* Badge de Tipo */}
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 rounded-md text-sm font-medium 
                        bg-[var(--neutral-200)] text-[var(--neutral-600)]">
                        {guia.tipo}
                      </span>
                    </div>

                    {/* Título */}
                    <h3 className="text-xl font-bold text-[var(--neutral-900)] mb-3">
                      {guia.titulo}
                    </h3>

                    {/* Descripción */}
                    <p className="text-[var(--neutral-600)] mb-6 flex-grow">
                      {guia.descripcion}
                    </p>

                    {/* Botón Descargar */}
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-3 
                      rounded-[var(--radius-base)] border-2 border-[var(--primary-600)] 
                      text-[var(--primary-600)] font-medium
                      transition-all duration-[var(--duration-base)]
                      hover:bg-[var(--primary-100)]">
                      <Download size={18} />
                      <span>Descargar</span>
                    </button>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Biblioteca de Prompts */}
        <section className="py-12 md:py-16 bg-white text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <AnimatedSection variant="slideUp" delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--neutral-900)] mb-6">
                ¿Buscas Prompts Listos?
              </h2>
              <p className="text-lg text-[var(--neutral-600)] mb-8">
                Accede a nuestra biblioteca completa de prompts organizados por área funcional
              </p>
              <a href="/adopcion-diaria#biblioteca-prompts">
                <button className="inline-flex items-center gap-2 px-8 py-3 rounded-[var(--radius-base)] 
                  bg-[var(--accent-orange)] text-white font-medium transition-all duration-[var(--duration-base)]
                  hover:bg-[var(--accent-orange)]/90 hover:shadow-lg">
                  Ver Biblioteca de Prompts
                </button>
              </a>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
