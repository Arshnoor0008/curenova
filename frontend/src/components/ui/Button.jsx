import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  type = 'button',
  onClick,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-150 select-none disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[#0284c7] cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1.5 rounded-md gap-1.5',
    md: 'text-sm px-3.5 py-2 rounded-lg gap-2',
    lg: 'text-base px-5 py-2.5 rounded-lg gap-2.5 font-semibold',
    icon: 'p-2 rounded-lg aspect-square',
    'icon-sm': 'p-1.5 rounded-md aspect-square text-xs'
  };

  const variantStyles = {
    primary: 'bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-sm hover:shadow active:scale-[0.99] border border-transparent dark:bg-[#38bdf8] dark:text-[#070d19] dark:hover:bg-[#7dd3fc] font-semibold',
    secondary: 'bg-[var(--color-surface-card)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-primary)] border border-[var(--color-border-strong)] shadow-xs hover:border-[var(--color-border-focus)]',
    subtle: 'bg-[var(--color-surface-sunken)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border border-transparent',
    destructive: 'bg-[#dc2626] hover:bg-[#b91c1c] text-white shadow-sm hover:shadow active:scale-[0.99] border border-transparent dark:bg-[#ef4444]',
    ghost: 'bg-transparent hover:bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
    outline: 'bg-transparent hover:bg-[var(--color-surface-hover)] text-[var(--color-brand-primary)] border border-[var(--color-brand-border)]'
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current shrink-0" />
      ) : Icon && iconPosition === 'left' ? (
        <Icon className="w-4 h-4 shrink-0 text-current" />
      ) : null}
      
      {children}

      {!loading && Icon && iconPosition === 'right' ? (
        <Icon className="w-4 h-4 shrink-0 text-current" />
      ) : null}
    </button>
  );
}
