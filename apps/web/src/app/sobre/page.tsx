/**
 * Página: Sobre Pulse Hub
 * 
 * Documentación de Contexto para Asistentes IA:
 * - Estrategia de Adopción IA: ../../docs/product/ESTRATEGIA-ADOPCION-IA.md
 * - PRD Completo: ../../docs/product/PRD-PULSE-HUB.md
 * - Design System: ../../docs/design/DESIGN-SYSTEM-PROMPT.md
 * - Arquitectura: ../../docs/reference/ARCHITECTURE.md
 * 
 * Esta página implementa: Manifiesto, Valores y Metodología "Ecos" de Pulse Hub
 */

import type { Metadata } from 'next';
import { Navbar, Card, AnimatedSection, Footer } from '@/shared/components';
import { Target, Shield, Users, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sobre Pulse Hub | Adopción ética de IA en empresas',
  description: 'Conoce nuestro manifiesto, valores y metodología Ecos. Ecosistema humano-tecnológico para transformar organizaciones con IA ética y efectiva.',
  keywords: ['sobre pulse hub', 'manifiesto IA', 'valores IA ética', 'metodología adopción IA', 'ecos de liderazgo'],
};

// Datos de valores
const valores = [
  {
    Icon: Target,
    titulo: 'Liderazgo Humano',
    descripcion: 'La tecnología amplifica el talento, no lo reemplaza. Empoderamos personas para que lideren la transformación con visión estratégica y habilidades prácticas en IA.'
  },
  {
    Icon: Shield,
    titulo: 'Innovación Ética',
    descripcion: 'Privacidad por diseño, transparencia en algoritmos y cumplimiento normativo son pilares no negociables. La innovación sin ética no es sostenible.'
  },
  {
    Icon: Users,
    titulo: 'Eficiencia Tecnológica',
    descripcion: 'ROI medible y resultados tangibles en menos de 12 meses. Automatizamos procesos manteniendo el control, la gobernanza y el humano en el bucle.'
  },
  {
    Icon: Heart,
    titulo: 'Impacto Sostenible',
    descripcion: 'Creamos hábitos y rituales que perduran más allá de un proyecto. La adopción de IA es un viaje continuo de aprendizaje y mejora.'
  }
];

// Datos de metodología
const metodologia = [
  'Diagnóstico de madurez con métricas claras',
  'Co-creación de la estrategia con stakeholders clave',
  'Capacitación por roles y contextos específicos',
  'Rituales diarios que crean hábitos sostenibles',
  'Automatización priorizada por impacto-esfuerzo',
  'Medición continua y ajuste iterativo'
];

export default function SobrePage() {
  return (
    <>
      {/* AI Context: Estrategia de Adopción IA - ../../docs/product/ESTRATEGIA-ADOPCION-IA.md */}
      {/* AI Context: PRD Pulse Hub - ../../docs/product/PRD-PULSE-HUB.md */}
      {/* AI Context: Esta página presenta el Manifiesto, Valores y Metodología Ecos */}
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-center justify-center 
          bg-gradient-to-b from-[#f5f8ff] to-white pt-32 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-[var(--neutral-900)] mb-6">
                  Sobre Pulse Hub
                </h1>
                <p className="text-lg md:text-xl text-[var(--neutral-600)] leading-relaxed">
                  Somos un ecosistema humano-tecnológico que transforma organizaciones 
                  a través de la adopción ética y efectiva de Inteligencia Artificial.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Sección Manifiesto */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection delay={0.1}>
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--neutral-900)] mb-8">
                  Nuestro Manifiesto
                </h2>
                <div className="space-y-6 text-lg text-[var(--neutral-600)] leading-relaxed">
                  <p>
                    Creemos que la Inteligencia Artificial es una oportunidad histórica para elevar el liderazgo humano, no para reemplazarlo. En Pulse Hub, adoptamos un enfoque que coloca a las personas en el centro, donde la tecnología amplifica el talento y la creatividad de los equipos.
                  </p>
                  <p>
                    Por eso, ofrecemos un camino estructurado, medible y ético para la adopción de IA en organizaciones. Desde la capacitación por roles hasta la automatización de alto impacto, nuestros Tres Pilares guían cada paso del proceso con foco en ROI, cumplimiento normativo y resultados tangibles.
                  </p>
                  <p>
                    Nuestro compromiso es con el éxito sostenible de tu organización. Creamos hábitos y rituales que perduran, equipos empoderados que lideran la transformación, y una cultura de innovación ética que prepara a tu empresa para el futuro de la IA.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Sección Valores */}
        <section className="py-16 md:py-24 bg-[var(--neutral-100)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection delay={0.1}>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--neutral-900)] mb-4">
                  Nuestros Valores
                </h2>
                <p className="text-lg text-[var(--neutral-600)]">
                  Principios que guían cada decisión y cada proyecto
                </p>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {valores.map((valor, idx) => (
                <AnimatedSection key={idx} delay={0.1 + idx * 0.05}>
                  <Card hover className="h-full">
                    <div className="w-16 h-16 rounded-2xl bg-[var(--primary-100)] 
                      flex items-center justify-center mb-6">
                      <valor.Icon size={32} className="text-[var(--primary-600)]" />
                    </div>
                    <h3 className="text-xl font-bold text-[var(--neutral-900)] mb-3">
                      {valor.titulo}
                    </h3>
                    <p className="text-[var(--neutral-600)] leading-relaxed">
                      {valor.descripcion}
                    </p>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Sección Metodología */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection delay={0.1}>
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--neutral-900)] 
                  text-center mb-8">
                  Metodología "Ecos"
                </h2>
                
                <div className="bg-[var(--primary-100)]/30 rounded-[var(--radius-lg)] p-8 md:p-12">
                  <p className="text-lg text-[var(--neutral-600)] mb-8 leading-relaxed">
                    Como ondas en el agua, cada acción genera resonancia en toda 
                    la organización. Nuestra metodología se basa en:
                  </p>
                  
                  <div className="space-y-4">
                    {metodologia.map((paso, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--primary-600)] 
                          flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">{idx + 1}</span>
                        </div>
                        <p className="text-[var(--neutral-900)] text-lg pt-2">
                          {paso}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
