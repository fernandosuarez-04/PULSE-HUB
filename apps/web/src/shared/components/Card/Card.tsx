import React from 'react';
import { cn } from '@/shared/utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hover?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, hover = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-[var(--radius-base)] bg-white p-6 shadow-[var(--shadow-base)] transition-all duration-[var(--duration-base)]',
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

