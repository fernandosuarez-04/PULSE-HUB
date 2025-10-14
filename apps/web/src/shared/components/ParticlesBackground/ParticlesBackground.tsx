'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

interface ParticlesBackgroundProps {
  className?: string;
  particleCount?: number;
  animated?: boolean;
}

const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({ 
  className = '', 
  particleCount = 50,
  animated = true 
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const generateParticles = (): Particle[] => {
      return Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 2, // 1-3px
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4, // 3-7 seconds
        opacity: 0.05 + Math.random() * 0.1, // 0.05-0.15
      }));
    };

    setParticles(generateParticles());
  }, [particleCount]);

  if (isReducedMotion || !animated) {
    // Static version for reduced motion
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-[var(--primary-600)]"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-[var(--primary-600)]"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, particle.opacity, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Additional subtle dots with neutral color */}
      {particles.slice(0, Math.floor(particleCount / 3)).map((particle, index) => (
        <motion.div
          key={`neutral-${particle.id}`}
          className="absolute rounded-full bg-[var(--neutral-600)]"
          style={{
            left: `${(particle.x + 20) % 100}%`,
            top: `${(particle.y + 30) % 100}%`,
            width: `${particle.size * 0.7}px`,
            height: `${particle.size * 0.7}px`,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, particle.opacity * 0.5, 0],
          }}
          transition={{
            duration: particle.duration + 2,
            delay: particle.delay + 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default ParticlesBackground;
