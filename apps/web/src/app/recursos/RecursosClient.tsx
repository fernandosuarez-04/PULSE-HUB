'use client';

import React from 'react';
import { GraduationCap, BookOpen, Clock, Download } from 'lucide-react';
import { Navbar, AnimatedSection, Card } from '@/shared/components';
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
      <Navbar />
      
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
            <AnimatedSection animation="slideUp" delay={0.1}>
              <div className="flex items-center gap-3 mb-8">
                <GraduationCap size={32} className="text-[var(--primary-600)]" />
                <h2 className="text-3xl font-bold text-[var(--neutral-900)]">
                  Cursos Disponibles
                </h2>
              </div>
            </AnimatedSection>

            <div className="space-y-6">
              {cursos.map((curso, index) => (
                <AnimatedSection key={curso.id} animation="slideUp" delay={0.15 + index * 0.1}>
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
            <AnimatedSection animation="slideUp" delay={0.1}>
              <div className="flex items-center gap-3 mb-8">
                <BookOpen size={32} className="text-[var(--primary-600)]" />
                <h2 className="text-3xl font-bold text-[var(--neutral-900)]">
                  Guías Descargables
                </h2>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guias.map((guia, index) => (
                <AnimatedSection key={guia.id} animation="slideUp" delay={0.15 + index * 0.1}>
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
            <AnimatedSection animation="slideUp" delay={0.1}>
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
    </>
  );
}
