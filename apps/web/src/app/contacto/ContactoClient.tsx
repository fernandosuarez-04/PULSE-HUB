'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Mail, Building2, Send, Loader2, CheckCircle } from 'lucide-react';
import { Navbar, AnimatedSection, Card, Button, Footer } from '@/shared/components';
import { cn } from '@/shared/utils/cn';

// Tipos TypeScript
interface OpcionContacto {
  id: string;
  icono: React.ComponentType<{ size?: number; className?: string }>;
  titulo: string;
  descripcion: string;
  accion?: {
    tipo: 'boton' | 'link';
    texto: string;
    url?: string;
    email?: string;
  };
}

interface FormData {
  fullName: string;
  email: string;
  company: string;
  role: string;
  companySize: string;
  pillarOfInterest: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

interface TouchedFields {
  [key: string]: boolean;
}

// Datos de opciones de contacto
const opcionesContacto: OpcionContacto[] = [
  {
    id: 'agendar-demo',
    icono: Calendar,
    titulo: 'Agendar Demo',
    descripcion: 'Reserva 30 minutos para conocer cómo podemos ayudarte a transformar tu organización con IA.',
    accion: {
      tipo: 'boton',
      texto: 'Abrir Calendario',
      url: '#calendario'
    }
  },
  {
    id: 'email-directo',
    icono: Mail,
    titulo: 'Email Directo',
    descripcion: '¿Prefieres escribirnos? Envíanos tus preguntas o requerimientos directamente a nuestro equipo.',
    accion: {
      tipo: 'link',
      texto: 'contacto@pulsehub.com',
      email: 'contacto@pulsehub.com'
    }
  },
  {
    id: 'alianzas',
    icono: Building2,
    titulo: 'Programa de Alianzas',
    descripcion: '¿Eres consultora o integradora? Conversemos sobre cómo podemos colaborar y potenciar juntos la adopción de IA.',
    accion: {
      tipo: 'boton',
      texto: 'Más información',
      url: '#alianzas'
    }
  }
];

// Opciones para selects
const opcionesRol = [
  'CEO/Dirección',
  'CTO/CIO',
  'Manager',
  'RR.HH.',
  'Operaciones',
  'Otro'
];

const opcionesTamano = [
  '1-10',
  '11-50',
  '51-200',
  '201-1000',
  '+1000'
];

const opcionesPilar = [
  'IA para Todos',
  'IA en el Día a Día',
  'Automatización de Alto Impacto',
  'General'
];

export const ContactoClient: React.FC = () => {
  // Estados del formulario
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    company: '',
    role: '',
    companySize: '',
    pillarOfInterest: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  // Validación del formulario
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'El nombre completo es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'La empresa es requerida';
    }

    if (!formData.role) {
      newErrors.role = 'Selecciona tu rol';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejo de cambios en inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Manejo de blur para mostrar errores
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  // Manejo del submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError(false);

    try {
      // Simulación de envío
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        company: '',
        role: '',
        companySize: '',
        pillarOfInterest: '',
        message: ''
      });
      setTouched({});
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#f5f8ff] via-[#fefeff] to-[#f0f5ff] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[var(--primary-100)]/30 via-transparent to-transparent opacity-50" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <AnimatedSection variant="slideUp" duration={0.8}>
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--neutral-900)] mb-4 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Comencemos Juntos
              </motion.h1>
              <motion.p
                className="text-lg sm:text-xl text-[var(--neutral-600)] max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Agenda una demo o envíanos un mensaje. Respondemos en menos de 24 horas.
              </motion.p>
            </AnimatedSection>
          </div>
        </section>

        {/* Contenido Principal */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Columna Izquierda: Cards de Acción */}
              <div className="lg:col-span-1 space-y-6">
                {opcionesContacto.map((opcion, index) => (
                  <AnimatedSection key={opcion.id} variant="slideUp" delay={0.1 + index * 0.05}>
                    <Card hover={true} className="h-full flex flex-col items-center text-center p-8">
                      <div className="bg-[var(--primary-100)] text-[var(--primary-600)] p-4 rounded-full mb-6">
                        <opcion.icono size={32} />
                      </div>
                      <h3 className="text-xl font-semibold text-[var(--neutral-900)] mb-3">
                        {opcion.titulo}
                      </h3>
                      <p className="text-[var(--neutral-600)] text-base flex-grow mb-6">
                        {opcion.descripcion}
                      </p>
                      
                      {opcion.accion?.tipo === 'boton' && (
                        <Button variant="secondary" size="md" className="w-full">
                          {opcion.accion.texto}
                        </Button>
                      )}
                      
                      {opcion.accion?.tipo === 'link' && opcion.accion.email && (
                        <a 
                          href={`mailto:${opcion.accion.email}`}
                          className="text-[var(--primary-600)] hover:underline font-medium"
                        >
                          {opcion.accion.texto}
                        </a>
                      )}
                    </Card>
                  </AnimatedSection>
                ))}
              </div>

              {/* Columna Derecha: Formulario de Contacto */}
              <div className="lg:col-span-2">
                <AnimatedSection variant="slideUp" delay={0.2}>
                  <Card className="p-8 sm:p-10">
                    <h2 className="text-3xl sm:text-4xl font-bold text-[var(--neutral-900)] text-center mb-12">
                      Envíanos un Mensaje
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Grid 2 columnas para campos */}
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Nombre completo */}
                        <div>
                          <label htmlFor="fullName" className="block text-sm font-medium text-[var(--neutral-900)] mb-2">
                            Nombre completo <span className="text-[var(--accent-red)]">*</span>
                          </label>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={cn(
                              "block w-full px-4 py-2 border rounded-[var(--radius-base)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-600)]",
                              errors.fullName && touched.fullName ? "border-[var(--accent-red)]" : "border-[var(--neutral-200)]"
                            )}
                            placeholder="María González"
                          />
                          {errors.fullName && touched.fullName && (
                            <p className="mt-1 text-sm text-[var(--accent-red)]">{errors.fullName}</p>
                          )}
                        </div>

                        {/* Email corporativo */}
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-[var(--neutral-900)] mb-2">
                            Email corporativo <span className="text-[var(--accent-red)]">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={cn(
                              "block w-full px-4 py-2 border rounded-[var(--radius-base)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-600)]",
                              errors.email && touched.email ? "border-[var(--accent-red)]" : "border-[var(--neutral-200)]"
                            )}
                            placeholder="maria@empresa.com"
                          />
                          {errors.email && touched.email && (
                            <p className="mt-1 text-sm text-[var(--accent-red)]">{errors.email}</p>
                          )}
                        </div>

                        {/* Empresa */}
                        <div>
                          <label htmlFor="company" className="block text-sm font-medium text-[var(--neutral-900)] mb-2">
                            Empresa <span className="text-[var(--accent-red)]">*</span>
                          </label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={cn(
                              "block w-full px-4 py-2 border rounded-[var(--radius-base)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-600)]",
                              errors.company && touched.company ? "border-[var(--accent-red)]" : "border-[var(--neutral-200)]"
                            )}
                            placeholder="Nombre de la empresa"
                          />
                          {errors.company && touched.company && (
                            <p className="mt-1 text-sm text-[var(--accent-red)]">{errors.company}</p>
                          )}
                        </div>

                        {/* Tu rol */}
                        <div>
                          <label htmlFor="role" className="block text-sm font-medium text-[var(--neutral-900)] mb-2">
                            Tu rol <span className="text-[var(--accent-red)]">*</span>
                          </label>
                          <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={cn(
                              "block w-full px-4 py-2 border rounded-[var(--radius-base)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-600)]",
                              errors.role && touched.role ? "border-[var(--accent-red)]" : "border-[var(--neutral-200)]"
                            )}
                          >
                            <option value="">Selecciona tu rol</option>
                            {opcionesRol.map((rol) => (
                              <option key={rol} value={rol}>{rol}</option>
                            ))}
                          </select>
                          {errors.role && touched.role && (
                            <p className="mt-1 text-sm text-[var(--accent-red)]">{errors.role}</p>
                          )}
                        </div>

                        {/* Tamaño de la empresa */}
                        <div>
                          <label htmlFor="companySize" className="block text-sm font-medium text-[var(--neutral-900)] mb-2">
                            Tamaño de la empresa
                          </label>
                          <select
                            id="companySize"
                            name="companySize"
                            value={formData.companySize}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="block w-full px-4 py-2 border border-[var(--neutral-200)] rounded-[var(--radius-base)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-600)]"
                          >
                            <option value="">Número de empleados</option>
                            {opcionesTamano.map((tamano) => (
                              <option key={tamano} value={tamano}>{tamano}</option>
                            ))}
                          </select>
                        </div>

                        {/* Pilar de interés */}
                        <div>
                          <label htmlFor="pillarOfInterest" className="block text-sm font-medium text-[var(--neutral-900)] mb-2">
                            Pilar de interés
                          </label>
                          <select
                            id="pillarOfInterest"
                            name="pillarOfInterest"
                            value={formData.pillarOfInterest}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="block w-full px-4 py-2 border border-[var(--neutral-200)] rounded-[var(--radius-base)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-600)]"
                          >
                            <option value="">Selecciona un pilar</option>
                            {opcionesPilar.map((pilar) => (
                              <option key={pilar} value={pilar}>{pilar}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Mensaje */}
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-[var(--neutral-900)] mb-2">
                          Mensaje <span className="text-[var(--accent-red)]">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={cn(
                            "block w-full px-4 py-2 border rounded-[var(--radius-base)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-600)]",
                            errors.message && touched.message ? "border-[var(--accent-red)]" : "border-[var(--neutral-200)]"
                          )}
                          placeholder="Cuéntanos sobre tu organización y qué te gustaría lograr con IA..."
                        ></textarea>
                        {errors.message && touched.message && (
                          <p className="mt-1 text-sm text-[var(--accent-red)]">{errors.message}</p>
                        )}
                      </div>

                      {/* Botón de envío */}
                      <div className="text-center">
                        <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto" disabled={loading}>
                          {loading ? (
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          ) : success ? (
                            <CheckCircle className="mr-2 h-5 w-5" />
                          ) : (
                            <Send className="mr-2 h-5 w-5" />
                          )}
                          {loading ? 'Enviando...' : success ? 'Mensaje Enviado!' : 'Enviar Mensaje'}
                        </Button>
                        
                        {success && (
                          <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 text-[var(--accent-green)] font-medium"
                          >
                            ¡Gracias por tu mensaje! Nos pondremos en contacto contigo en breve.
                            <button
                              onClick={() => {
                                setSuccess(false);
                                setFormData({
                                  fullName: '', email: '', company: '', role: '', companySize: '', pillarOfInterest: '', message: ''
                                });
                                setErrors({});
                                setTouched({});
                              }}
                              className="ml-2 text-[var(--primary-600)] hover:underline"
                            >
                              Enviar otro mensaje
                            </button>
                          </motion.p>
                        )}
                        
                        {error && (
                          <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 text-[var(--accent-red)] font-medium"
                          >
                            Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo.
                          </motion.p>
                        )}
                        
                        <p className="mt-4 text-sm text-[var(--neutral-600)]">
                          Sin compromiso • Respuesta en 24h • Evaluación gratuita
                        </p>
                      </div>
                    </form>
                  </Card>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};
