import { HTMLAttributes } from 'react';

export type CardVariant = 'default' | 'elevated' | 'outline';

export interface CardProps extends HTMLAttributes<HTMLDivElement>
{
	variant?: CardVariant;
	className?: string;
}

export interface CardSectionProps extends HTMLAttributes<HTMLDivElement>
{
	className?: string;
}

const variantClasses: Record<CardVariant, string> = {
	default:  'bg-surface border border-surface-border rounded-lg',
	elevated: 'bg-surface shadow-md rounded-lg',
	outline:  'bg-transparent border-2 border-surface-border rounded-lg',
};

export function Card({
	variant = 'default',
	className = '',
	children,
	...props
}: CardProps)
{
	return (
		<div
			className={`${variantClasses[variant]} ${className}`}
			{...props}
		>
			{children}
		</div>
	);
}

export function CardHeader({
	className = '',
	children,
	...props
}: CardSectionProps)
{
	return (
		<div
			className={`px-6 pt-6 pb-4 ${className}`}
			{...props}
		>
			{children}
		</div>
	);
}

export function CardContent({
	className = '',
	children,
	...props
}: CardSectionProps)
{
	return (
		<div
			className={`px-6 py-4 ${className}`}
			{...props}
		>
			{children}
		</div>
	);
}

export function CardFooter({
	className = '',
	children,
	...props
}: CardSectionProps)
{
	return (
		<div
			className={`px-6 pt-4 pb-6 flex justify-end gap-3 ${className}`}
			{...props}
		>
			{children}
		</div>
	);
}
