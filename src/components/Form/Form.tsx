'use client';

import { FormHTMLAttributes, LabelHTMLAttributes, ReactNode } from 'react';

export interface FormProps extends FormHTMLAttributes<HTMLFormElement>
{
	className?: string;
}

export interface FormSectionProps
{
	title?:       string;
	description?: string;
	className?:   string;
	children:     ReactNode;
}

export interface FormFieldProps
{
	className?: string;
	children:   ReactNode;
}

export interface FormLabelProps extends LabelHTMLAttributes<HTMLLabelElement>
{
	required?:  boolean;
	htmlFor?:   string;
	className?: string;
}

export interface FormControlProps
{
	className?: string;
	children:   ReactNode;
}

export interface FormDescriptionProps
{
	className?: string;
	children:   ReactNode;
}

export interface FormMessageProps
{
	className?: string;
	children?:  ReactNode;
}

export function FormSection({ title, description, className = '', children }: FormSectionProps)
{
	return (
		<fieldset className={`space-y-4 border-0 p-0 m-0 min-w-0 ${className}`}>
			{(title || description) && (
				<div className="flex flex-col gap-1">
					{title && (
						<legend className="text-base font-semibold text-text float-none w-full">
							{title}
						</legend>
					)}
					{description && (
						<p className="text-sm text-text-muted">{description}</p>
					)}
				</div>
			)}
			{children}
		</fieldset>
	);
}

export function FormField({ className = '', children }: FormFieldProps)
{
	return (
		<div className={`flex flex-col gap-1.5 ${className}`}>
			{children}
		</div>
	);
}

export function FormLabel({ required, className = '', children, ...props }: FormLabelProps)
{
	return (
		<label className={`text-sm font-medium text-text ${className}`} {...props}>
			{children}
			{required && (
				<span className="text-input-error ml-0.5" aria-hidden="true"> *</span>
			)}
		</label>
	);
}

export function FormControl({ className = '', children }: FormControlProps)
{
	return (
		<div className={className}>
			{children}
		</div>
	);
}

export function FormDescription({ className = '', children }: FormDescriptionProps)
{
	return (
		<p className={`text-sm text-text-muted ${className}`}>
			{children}
		</p>
	);
}

export function FormMessage({ className = '', children }: FormMessageProps)
{
	if(!children) return null;

	return (
		<p className={`text-sm text-input-error ${className}`} role="alert">
			{children}
		</p>
	);
}

export default function Form({ className = '', children, ...props }: FormProps)
{
	return (
		<form className={`space-y-6 ${className}`} {...props}>
			{children}
		</form>
	);
}
