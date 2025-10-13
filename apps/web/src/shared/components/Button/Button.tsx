import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-[var(--radius-base)] font-medium transition-all duration-[var(--duration-base)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-600)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-[var(--accent-orange)] text-white hover:opacity-90 hover:shadow-md',
        secondary: 'border-2 border-[var(--primary-600)] text-[var(--primary-600)] hover:bg-[var(--primary-100)] hover:shadow-sm',
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
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export default Button;
