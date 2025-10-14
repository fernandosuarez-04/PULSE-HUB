import React from 'react';
import { cn } from '@/shared/utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hover?: boolean;
  variant?: 'default' | 'glass';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, hover = false, variant = 'default', ...props }, ref) => {
    const getVariantClasses = () => {
      switch (variant) {
        case 'glass':
          return 'bg-white/60 backdrop-blur-lg border border-white/40 shadow-[0_8px_32px_rgba(10,22,51,0.08)]';
        case 'default':
        default:
          return 'bg-white shadow-[var(--shadow-base)]';
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-[var(--radius-base)] p-6 transition-all duration-[var(--duration-base)]',
          getVariantClasses(),
          hover && 'hover:shadow-[var(--shadow-md)] hover:scale-[1.02]',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;

