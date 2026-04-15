'use client';

import { createContext, useContext } from 'react';

interface RadioContextValue
{
	name: string;
	value: string;
	onValueChange: (v: string) => void;
}

const RadioContext = createContext<RadioContextValue | null>(null);

function useRadioContext()
{
	const ctx = useContext(RadioContext);
	if(!ctx) throw new Error('RadioItem must be used inside a RadioGroup');
	return ctx;
}

export interface RadioGroupProps
{
	value: string;
	onValueChange: (v: string) => void;
	name: string;
	className?: string;
	children: React.ReactNode;
}

export function RadioGroup({ value, onValueChange, name, className = '', children }: RadioGroupProps)
{
	return (
		<RadioContext.Provider value={{ name, value, onValueChange }}>
			<div role="radiogroup" className={`flex flex-col gap-3 ${className}`}>
				{children}
			</div>
		</RadioContext.Provider>
	);
}

export interface RadioItemProps
{
	value: string;
	label: string;
	hint?: string;
	disabled?: boolean;
	className?: string;
}

export function RadioItem({ value, label, hint, disabled = false, className = '' }: RadioItemProps)
{
	const ctx = useRadioContext();
	const checked = ctx.value === value;
	const id = `${ctx.name}-${value}`;

	const handleChange = () =>
	{
		if(!disabled) ctx.onValueChange(value);
	};

	return (
		<label
			htmlFor={id}
			className={[
				'group flex items-start gap-3 cursor-pointer',
				disabled ? 'opacity-40 pointer-events-none' : '',
				className,
			].join(' ').trim()}
		>
			<div className="relative flex items-center justify-center mt-0.5 shrink-0">
				<input
					type="radio"
					id={id}
					name={ctx.name}
					value={value}
					checked={checked}
					disabled={disabled}
					onChange={handleChange}
					aria-checked={checked}
					className="peer sr-only"
				/>
				<div
					className={[
						'w-4 h-4 rounded-full border-2 bg-surface flex items-center justify-center',
						'transition-colors duration-150',
						'peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-brand-ring',
						checked
							? 'border-brand'
							: 'border-surface-border group-hover:border-brand',
					].join(' ')}
				>
					{checked && (
						<div className="w-2 h-2 rounded-full bg-brand" />
					)}
				</div>
			</div>

			<div className="flex flex-col gap-0.5">
				<span className="text-sm text-text leading-none">{label}</span>
				{hint && (
					<span className="text-xs text-text-muted">{hint}</span>
				)}
			</div>
		</label>
	);
}
