'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface RippleEffectProps {
  color?: string;
}

export const RippleEffect: React.FC<RippleEffectProps> = ({ color = 'rgba(255,255,255,0.6)' }) => {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const addRipple = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = { x, y, id: Date.now() };
    setRipples([...ripples, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);
  };

  return (
    <div 
      className="absolute inset-0 overflow-hidden rounded-[var(--radius-base)]"
      onMouseEnter={addRipple}
    >
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 0,
              height: 0,
              backgroundColor: color,
            }}
            initial={{ width: 0, height: 0, opacity: 1 }}
            animate={{ 
              width: 400, 
              height: 400, 
              opacity: 0,
              x: -200,
              y: -200
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
