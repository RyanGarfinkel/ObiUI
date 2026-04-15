'use client';

import { createContext, useContext, HTMLAttributes, ButtonHTMLAttributes } from 'react';

interface TabsContextValue
{
	value: string;
	onValueChange: (v: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabsContext = () =>
{
	const ctx = useContext(TabsContext);
	if(!ctx) throw new Error('Tabs subcomponents must be used inside <Tabs>');
	return ctx;
};

export interface TabsProps
{
	value: string;
	onValueChange: (v: string) => void;
	children: React.ReactNode;
	className?: string;
}

export function Tabs({ value, onValueChange, children, className = '' }: TabsProps)
{
	return (
		<TabsContext.Provider value={{ value, onValueChange }}>
			<div className={className}>
				{children}
			</div>
		</TabsContext.Provider>
	);
}

export interface TabsListProps extends HTMLAttributes<HTMLDivElement>
{
	children: React.ReactNode;
	className?: string;
}

export function TabsList({ children, className = '', ...props }: TabsListProps)
{
	return (
		<div
			role="tablist"
			className={`border-b border-surface-border flex gap-1 ${className}`}
			{...props}
		>
			{children}
		</div>
	);
}

export interface TabsTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement>
{
	value: string;
	children: React.ReactNode;
	className?: string;
}

export function TabsTrigger({ value, children, className = '', disabled, ...props }: TabsTriggerProps)
{
	const { value: activeValue, onValueChange } = useTabsContext();
	const isActive = activeValue === value;

	const baseClasses = 'relative px-4 py-2 text-sm rounded-t-md transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-ring disabled:pointer-events-none disabled:opacity-40';

	const stateClasses = isActive
		? 'bg-surface border-b-2 border-brand text-text font-medium'
		: 'text-text-muted hover:text-text hover:bg-surface-hover';

	return (
		<button
			role="tab"
			aria-selected={isActive}
			aria-controls={`panel-${value}`}
			id={`trigger-${value}`}
			disabled={disabled}
			className={`${baseClasses} ${stateClasses} ${className}`}
			onClick={() => onValueChange(value)}
			{...props}
		>
			{children}
		</button>
	);
}

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement>
{
	value: string;
	children: React.ReactNode;
	className?: string;
}

export function TabsContent({ value, children, className = '', ...props }: TabsContentProps)
{
	const { value: activeValue } = useTabsContext();

	if(activeValue !== value) return null;

	return (
		<div
			role="tabpanel"
			id={`panel-${value}`}
			aria-labelledby={`trigger-${value}`}
			className={`pt-4 ${className}`}
			{...props}
		>
			{children}
		</div>
	);
}
