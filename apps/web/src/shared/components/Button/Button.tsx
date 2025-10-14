'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn';
import { ShimmerEffect } from './ShimmerEffect';
import { RippleEffect } from './RippleEffect';

// Variantes de animación por tipo de botón
const buttonAnimations = {
  primary: {
    rest: { scale: 1 },
    hover: { 
      scale: 1.03,
      transition: { duration: 0.2, ease: 'easeOut' }
    },
    tap: { scale: 0.98 }
  },
  secondary: {
    rest: { scale: 1 },
    hover: { 
      scale: 1.02,
      transition: { duration: 0.2, ease: 'easeOut' }
    },
    tap: { scale: 0.98 }
  },
  tertiary: {
    rest: { scale: 1 },
    hover: { 
      scale: 1.01,
      transition: { duration: 0.16, ease: 'easeOut' }
    },
    tap: { scale: 0.99 }
  }
};

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-[var(--radius-base)] font-medium transition-all duration-[var(--duration-base)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-600)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer relative overflow-hidden',
  {
    variants: {
      variant: {
        primary: 'bg-[var(--accent-orange)] text-white shadow-md hover:shadow-lg hover:shadow-[var(--accent-orange)]/30',
        secondary: 'border-2 border-[var(--primary-600)] text-[var(--primary-600)] hover:bg-[var(--primary-100)] hover:shadow-md hover:border-[var(--primary-600)]',
        tertiary: 'text-[var(--primary-600)] hover:underline hover:opacity-80',
      },
      size: {
        sm: 'h-9 px-3 text-[var(--text-sm)]',
        md: 'h-11 px-6 text-[var(--text-base)]',
        lg: 'h-13 px-8 text-[var(--text-lg)]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size, children, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <motion.button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        variants={buttonAnimations[variant]}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        {...props}
      >
        {/* Shimmer effect para primary */}
        {variant === 'primary' && <ShimmerEffect />}
        
        {/* Ripple effect para secondary */}
        {variant === 'secondary' && <RippleEffect color="rgba(31, 90, 246, 0.2)" />}
        
        {/* Contenido del botón */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
        
        {/* Glow effect en hover para primary */}
        {isHovered && variant === 'primary' && (
          <motion.div
            className="absolute inset-0 rounded-[var(--radius-base)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              boxShadow: '0 0 20px rgba(255, 122, 69, 0.5)',
            }}
          />
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
