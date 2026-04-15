'use client';

import { createContext, useContext, useState, HTMLAttributes, ButtonHTMLAttributes } from 'react';

export type AccordionType = 'single' | 'multiple';

interface AccordionContextValue
{
	type: AccordionType;
	openItems: Set<string>;
	toggle: (value: string) => void;
	collapsible: boolean;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

const useAccordionContext = () =>
{
	const ctx = useContext(AccordionContext);
	if(!ctx) throw new Error('Accordion subcomponents must be used inside <Accordion>');
	return ctx;
};

interface AccordionItemContextValue
{
	value: string;
	isOpen: boolean;
}

const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

const useAccordionItemContext = () =>
{
	const ctx = useContext(AccordionItemContext);
	if(!ctx) throw new Error('AccordionTrigger and AccordionContent must be used inside <AccordionItem>');
	return ctx;
};

export interface AccordionProps extends HTMLAttributes<HTMLDivElement>
{
	type?: AccordionType;
	defaultValue?: string | string[];
	collapsible?: boolean;
	className?: string;
}

export default function Accordion({
	type = 'single',
	defaultValue,
	collapsible = false,
	className = '',
	children,
	...props
}: AccordionProps)
{
	const initial = defaultValue
		? new Set(Array.isArray(defaultValue) ? defaultValue : [defaultValue])
		: new Set<string>();

	const [openItems, setOpenItems] = useState<Set<string>>(initial);

	const toggle = (value: string) =>
	{
		setOpenItems((prev) =>
		{
			const next = new Set(prev);

			if(next.has(value))
			{
				if(type === 'single' && !collapsible) return prev;
				next.delete(value);
				return next;
			}

			if(type === 'single') next.clear();
			next.add(value);
			return next;
		});
	};

	return (
		<AccordionContext.Provider value={{ type, openItems, toggle, collapsible }}>
			<div className={`divide-y divide-surface-border ${className}`} {...props}>
				{children}
			</div>
		</AccordionContext.Provider>
	);
}

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement>
{
	value: string;
	className?: string;
}

export function AccordionItem({ value, className = '', children, ...props }: AccordionItemProps)
{
	const { openItems } = useAccordionContext();
	const isOpen = openItems.has(value);

	return (
		<AccordionItemContext.Provider value={{ value, isOpen }}>
			<div className={className} {...props}>
				{children}
			</div>
		</AccordionItemContext.Provider>
	);
}

export interface AccordionTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement>
{
	className?: string;
}

export function AccordionTrigger({ className = '', children, disabled, ...props }: AccordionTriggerProps)
{
	const { toggle } = useAccordionContext();
	const { value, isOpen } = useAccordionItemContext();

	return (
		<button
			type="button"
			aria-expanded={isOpen}
			disabled={disabled}
			onClick={() => toggle(value)}
			className={`flex w-full items-center justify-between py-4 text-sm font-medium text-text transition-colors duration-150 hover:text-text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-ring disabled:pointer-events-none disabled:opacity-40 ${className}`}
			{...props}
		>
			{children}
			<svg
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
				className={`shrink-0 text-text-muted transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`}
			>
				<path d="m6 9 6 6 6-6" />
			</svg>
		</button>
	);
}

export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement>
{
	className?: string;
}

export function AccordionContent({ className = '', children, ...props }: AccordionContentProps)
{
	const { isOpen } = useAccordionItemContext();

	return (
		<div
			role="region"
			hidden={!isOpen}
			className={`overflow-hidden ${isOpen ? 'pb-4' : ''} ${className}`}
			{...props}
		>
			<div className="text-sm text-text-muted">
				{children}
			</div>
		</div>
	);
}
