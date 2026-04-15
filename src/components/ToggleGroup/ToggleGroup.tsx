'use client';

import { createContext, useContext, ButtonHTMLAttributes } from 'react';

export type ToggleGroupType = 'single' | 'multiple';
export type ToggleGroupSize = 'sm' | 'md' | 'lg';

interface ToggleGroupContextValue
{
	type: ToggleGroupType;
	value: string | string[];
	onValueChange: (value: string | string[]) => void;
	size: ToggleGroupSize;
	disabled: boolean;
}

const ToggleGroupContext = createContext<ToggleGroupContextValue | null>(null);

function useToggleGroupContext()
{
	const ctx = useContext(ToggleGroupContext);
	if(!ctx) throw new Error('ToggleGroupItem must be used inside a ToggleGroup');
	return ctx;
}

export interface ToggleGroupProps
{
	type: ToggleGroupType;
	value: string | string[];
	onValueChange: (value: string | string[]) => void;
	size?: ToggleGroupSize;
	disabled?: boolean;
	className?: string;
	children: React.ReactNode;
}

export interface ToggleGroupItemProps extends ButtonHTMLAttributes<HTMLButtonElement>
{
	value: string;
	disabled?: boolean;
	children: React.ReactNode;
	className?: string;
}

const sizeClasses: Record<ToggleGroupSize, string> = {
	sm: 'h-8 px-3 text-xs',
	md: 'h-9 px-4 text-sm',
	lg: 'h-11 px-5 text-base',
};

const ITEM_BASE = 'inline-flex items-center justify-center font-medium tracking-tight transition-colors duration-150 border-r border-surface-border last:border-r-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-ring disabled:pointer-events-none disabled:opacity-40';

export function ToggleGroupItem({
	value,
	disabled = false,
	children,
	className = '',
	...props
}: ToggleGroupItemProps)
{
	const ctx = useToggleGroupContext();

	const isActive = ctx.type === 'single'
		? ctx.value === value
		: Array.isArray(ctx.value) && ctx.value.includes(value);

	const isDisabled = disabled || ctx.disabled;

	const handleClick = () =>
	{
		if(isDisabled) return;

		if(ctx.type === 'single')
		{
			ctx.onValueChange(value);
		}
		else
		{
			const current = Array.isArray(ctx.value) ? ctx.value : [];
			const next = current.includes(value)
				? current.filter(v => v !== value)
				: [...current, value];
			ctx.onValueChange(next);
		}
	};

	const stateClasses = isActive
		? 'bg-brand text-brand-fg'
		: 'bg-surface text-text hover:bg-surface-hover';

	return (
		<button
			type="button"
			aria-pressed={isActive}
			disabled={isDisabled}
			onClick={handleClick}
			className={`${ITEM_BASE} ${sizeClasses[ctx.size]} ${stateClasses} ${className}`}
			{...props}
		>
			{children}
		</button>
	);
}

export function ToggleGroup({
	type,
	value,
	onValueChange,
	size = 'md',
	disabled = false,
	className = '',
	children,
}: ToggleGroupProps)
{
	return (
		<ToggleGroupContext.Provider value={{ type, value, onValueChange, size, disabled }}>
			<div
				role="group"
				className={`inline-flex items-center rounded-md border border-surface-border bg-surface overflow-hidden ${className}`}
			>
				{children}
			</div>
		</ToggleGroupContext.Provider>
	);
}

export default ToggleGroup;
