'use client';

import { ClipboardEvent, KeyboardEvent, useRef } from 'react';

export interface OTPInputProps
{
	length?:    number;
	value?:     string;
	onChange?:  (value: string) => void;
	label?:     string;
	error?:     string;
	hint?:      string;
	disabled?:  boolean;
	className?: string;
}

const OTPInput = ({
	length = 6,
	value = '',
	onChange,
	label,
	error,
	hint,
	disabled,
	className = '',
}: OTPInputProps) =>
{
	const inputId = label?.toLowerCase().replace(/\s+/g, '-') ?? 'otp';
	const refs = useRef<(HTMLInputElement | null)[]>([]);

	const chars = Array.from({ length }, (_, i) => value[i] ?? '');

	const feedbackId = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;
	const feedbackText = error ?? hint;

	const handleChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) =>
	{
		const digit = e.target.value.replace(/\D/g, '').slice(-1);
		const newChars = [...chars];
		newChars[index] = digit;
		onChange?.(newChars.join(''));

		if(digit && index < length - 1)
			refs.current[index + 1]?.focus();
	};

	const handleKeyDown = (index: number) => (e: KeyboardEvent<HTMLInputElement>) =>
	{
		if(e.key === 'Backspace')
		{
			if(chars[index])
			{
				const newChars = [...chars];
				newChars[index] = '';
				onChange?.(newChars.join(''));
			}
			else if(index > 0)
			{
				const newChars = [...chars];
				newChars[index - 1] = '';
				onChange?.(newChars.join(''));
				refs.current[index - 1]?.focus();
			}
		}
		else if(e.key === 'ArrowLeft' && index > 0)
		{
			e.preventDefault();
			refs.current[index - 1]?.focus();
		}
		else if(e.key === 'ArrowRight' && index < length - 1)
		{
			e.preventDefault();
			refs.current[index + 1]?.focus();
		}
	};

	const handlePaste = (e: ClipboardEvent<HTMLInputElement>) =>
	{
		e.preventDefault();
		const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
		if(!pasted) return;
		onChange?.(pasted);
		refs.current[Math.min(pasted.length, length - 1)]?.focus();
	};

	const handleFocus = (index: number) => () =>
	{
		refs.current[index]?.select();
	};

	const cellClass = [
		'w-10 h-12 text-center text-lg font-semibold rounded-md border bg-surface text-text',
		'caret-transparent outline-none',
		'motion-safe:transition-colors motion-safe:duration-[var(--duration-fast)]',
		'hover:border-input-border-hover',
		'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-0',
		error
			? 'border-input-error focus-visible:outline-input-error-ring'
			: 'border-input-border focus-visible:outline-input-ring',
		'disabled:cursor-not-allowed disabled:bg-input-disabled-bg disabled:text-input-disabled-text disabled:border-input-border',
	].join(' ');

	return (
		<div className={`flex flex-col gap-1.5 ${className}`}>
			{label && (
				<label
					id={`${inputId}-label`}
					htmlFor={`${inputId}-0`}
					className='text-sm font-medium text-text'
				>
					{label}
				</label>
			)}
			<div
				role='group'
				aria-labelledby={label ? `${inputId}-label` : undefined}
				aria-describedby={feedbackId}
				className='flex gap-2'
			>
				{Array.from({ length }).map((_, index) => (
					<input
						key={index}
						ref={el => { refs.current[index] = el; }}
						id={index === 0 ? `${inputId}-0` : undefined}
						type='text'
						inputMode='numeric'
						pattern='[0-9]*'
						maxLength={1}
						value={chars[index]}
						onChange={handleChange(index)}
						onKeyDown={handleKeyDown(index)}
						onPaste={handlePaste}
						onFocus={handleFocus(index)}
						disabled={disabled}
						aria-label={`Digit ${index + 1} of ${length}`}
						className={cellClass}
					/>
				))}
			</div>
			<div
				className={[
					'grid motion-safe:transition-all motion-safe:duration-[var(--duration-fast)]',
					feedbackText ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
				].join(' ')}
			>
				<div className='overflow-hidden'>
					<p
						id={feedbackId}
						className={`pt-1 text-sm ${error ? 'text-input-error' : 'text-text-muted'}`}
					>
						{feedbackText ?? ''}
					</p>
				</div>
			</div>
		</div>
	);
};

OTPInput.displayName = 'OTPInput';

export default OTPInput;
