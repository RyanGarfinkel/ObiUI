'use client';

import { ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'ghost' | 'link' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>
{
	variant?: ButtonVariant;
	size?: ButtonSize;
	loading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
	primary:     'bg-brand text-brand-fg [--shadow-color:var(--color-brand-active)] shadow-[var(--shadow-sm)] hover:bg-brand-hover hover:shadow-[var(--shadow)] active:bg-brand-active active:shadow-[var(--shadow-sm)] focus-visible:ring-offset-2 focus-visible:ring-brand-ring',
	secondary:   'bg-surface text-text border-[length:var(--border-width)] border-surface-border shadow-[var(--shadow-sm)] hover:bg-surface-hover hover:border-surface-border-hover active:bg-surface-active focus-visible:border-transparent focus-visible:ring-brand-ring',
	outlined:    'border-2 border-brand text-brand hover:bg-brand/10 active:bg-brand/20 focus-visible:ring-offset-2 focus-visible:ring-brand-ring',
	ghost:       'text-text hover:bg-surface-hover active:bg-surface-active focus-visible:ring-brand-ring',
	link:        'text-text underline-offset-4 hover:underline active:text-text-muted focus-visible:ring-brand-ring',
	destructive: 'bg-danger text-text-inverted [--shadow-color:var(--color-danger-active)] shadow-[var(--shadow-sm)] hover:bg-danger-hover active:bg-danger-active focus-visible:ring-offset-2 focus-visible:ring-danger-ring',
};

const sizeClasses: Record<ButtonSize, string> = {
	sm:   'h-8 px-3 text-xs',
	md:   'h-9 px-4 text-sm',
	lg:   'h-11 px-6 text-base',
	icon: 'h-9 w-9',
};

const BASE = 'inline-flex items-center justify-center gap-2 rounded-[var(--radius)] font-medium tracking-tight transition-all duration-150 focus:outline-none focus-visible:ring-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40';

const Spinner = () => (
	<svg
		className='animate-spin'
		width='14'
		height='14'
		viewBox='0 0 24 24'
		fill='none'
		aria-hidden='true'
	>
		<circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='3' className='opacity-25' />
		<path d='M12 2a10 10 0 0 1 10 10' stroke='currentColor' strokeWidth='3' strokeLinecap='round' className='opacity-75' />
	</svg>
);

const Button = (
	{
		variant = 'primary',
		size = 'md',
		loading = false,
		className = '',
		children,
		disabled,
		...props
	}: ButtonProps
) => {
	return (
		<button
			aria-busy={loading || undefined}
			disabled={disabled || loading}
			className={`${BASE} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
			{...props}
		>
			{loading ? <Spinner /> : children}
		</button>
	);
};

export default Button;
