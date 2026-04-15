'use client';

import { useState, useEffect, useRef, useId } from 'react';

export interface CalendarInputProps
{
	value?: Date | null;
	onChange?: (date: Date | null) => void;
	placeholder?: string;
	label?: string;
	error?: string;
	hint?: string;
	disabled?: boolean;
	minDate?: Date;
	maxDate?: Date;
	id?: string;
	className?: string;
}

interface DisplayMonth
{
	year: number;
	month: number;
}

const MONTH_NAMES = [
	'January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December',
];

const MONTH_SHORT = [
	'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
	'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const DAY_HEADERS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function formatDate(date: Date): string
{
	const month = MONTH_SHORT[date.getMonth()];
	const day   = date.getDate();
	const year  = date.getFullYear();
	return `${month} ${day}, ${year}`;
}

function getDaysInMonth(year: number, month: number): number
{
	return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number): number
{
	return new Date(year, month, 1).getDay();
}

function isSameDay(a: Date, b: Date): boolean
{
	return (
		a.getFullYear() === b.getFullYear() &&
		a.getMonth()    === b.getMonth()    &&
		a.getDate()     === b.getDate()
	);
}

function isToday(date: Date): boolean
{
	return isSameDay(date, new Date());
}

const INPUT_BASE = [
	'w-full rounded-md border bg-surface text-text px-3 py-2 text-sm',
	'placeholder:text-text-subtle',
	'transition-colors outline-none',
	'cursor-pointer text-left',
].join(' ');

const INPUT_NORMAL = [
	'border-input-border',
	'hover:border-input-border-hover',
	'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-0 focus-visible:outline-input-ring',
].join(' ');

const INPUT_ERROR = [
	'border-input-error',
	'hover:border-input-error',
	'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-0 focus-visible:outline-input-error-ring',
].join(' ');

const INPUT_DISABLED = 'disabled:cursor-not-allowed disabled:bg-input-disabled-bg disabled:text-input-disabled-text disabled:border-input-border';

const NAV_BTN = [
	'flex items-center justify-center w-7 h-7 rounded-md text-text-muted',
	'transition-colors duration-150 ease-out',
	'hover:bg-surface-hover hover:text-text',
	'focus:outline-none',
	'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-ring',
	'active:bg-surface-active',
].join(' ');

export default function CalendarInput({
	value,
	onChange,
	placeholder = 'Select a date',
	label,
	error,
	hint,
	disabled,
	minDate,
	maxDate,
	id,
	className = '',
}: CalendarInputProps)
{
	const autoId         = useId();
	const inputId        = id ?? `calendar-input-${autoId}`;
	const popoverId      = `${inputId}-popover`;
	const [isOpen, setIsOpen]             = useState(false);
	const [displayMonth, setDisplayMonth] = useState<DisplayMonth>(() =>
	{
		const base = value ?? new Date();
		return { year: base.getFullYear(), month: base.getMonth() };
	});

	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() =>
	{
		if(value)
			setDisplayMonth({ year: value.getFullYear(), month: value.getMonth() });
	}, [value]);

	useEffect(() =>
	{
		if(!isOpen) return;

		function handleMouseDown(e: MouseEvent)
		{
			if(containerRef.current && !containerRef.current.contains(e.target as Node))
				setIsOpen(false);
		}

		document.addEventListener('mousedown', handleMouseDown);
		return () => document.removeEventListener('mousedown', handleMouseDown);
	}, [isOpen]);

	function handleKeyDown(e: React.KeyboardEvent)
	{
		if(e.key === 'Escape') setIsOpen(false);
	}

	function goToPrevMonth()
	{
		setDisplayMonth(prev =>
		{
			if(prev.month === 0) return { year: prev.year - 1, month: 11 };
			return { year: prev.year, month: prev.month - 1 };
		});
	}

	function goToNextMonth()
	{
		setDisplayMonth(prev =>
		{
			if(prev.month === 11) return { year: prev.year + 1, month: 0 };
			return { year: prev.year, month: prev.month + 1 };
		});
	}

	function selectDay(date: Date)
	{
		onChange?.(date);
		setIsOpen(false);
	}

	function buildCalendarDays()
	{
		const { year, month } = displayMonth;
		const daysInMonth     = getDaysInMonth(year, month);
		const firstDow        = getFirstDayOfWeek(year, month);
		const days: Array<{ date: Date; isCurrentMonth: boolean }> = [];

		const prevMonthYear  = month === 0 ? year - 1 : year;
		const prevMonth      = month === 0 ? 11 : month - 1;
		const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth);

		for(let i = firstDow - 1; i >= 0; i--)
			days.push({ date: new Date(prevMonthYear, prevMonth, daysInPrevMonth - i), isCurrentMonth: false });

		for(let d = 1; d <= daysInMonth; d++)
			days.push({ date: new Date(year, month, d), isCurrentMonth: true });

		const remaining = 42 - days.length;
		const nextMonthYear = month === 11 ? year + 1 : year;
		const nextMonth     = month === 11 ? 0 : month + 1;
		for(let d = 1; d <= remaining; d++)
			days.push({ date: new Date(nextMonthYear, nextMonth, d), isCurrentMonth: false });

		return days;
	}

	function isDayDisabled(date: Date): boolean
	{
		if(minDate && date < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate()))
			return true;
		if(maxDate && date > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate()))
			return true;
		return false;
	}

	const days         = buildCalendarDays();
	const triggerClass = [
		INPUT_BASE,
		error ? INPUT_ERROR : INPUT_NORMAL,
		INPUT_DISABLED,
		'pr-9',
		className,
	].join(' ');

	return (
		<div className="flex flex-col gap-1.5">
			{label && (
				<label htmlFor={inputId} className="text-sm font-medium text-text">
					{label}
				</label>
			)}

			<div ref={containerRef} className="relative" onKeyDown={handleKeyDown}>
				<button
					type="button"
					id={inputId}
					disabled={disabled}
					aria-haspopup="dialog"
					aria-expanded={isOpen}
					aria-controls={isOpen ? popoverId : undefined}
					aria-invalid={!!error}
					aria-describedby={
						error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
					}
					onClick={() => { if(!disabled) setIsOpen(prev => !prev); }}
					className={triggerClass}
				>
					<span className={value ? 'text-text' : 'text-text-subtle'}>
						{value ? formatDate(value) : placeholder}
					</span>
				</button>

				<span
					aria-hidden="true"
					className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
				>
					<svg
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
					>
						<rect x="1" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
						<path d="M1 7h14" stroke="currentColor" strokeWidth="1.5" />
						<path d="M5 1v3M11 1v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
					</svg>
				</span>

				{isOpen && (
					<div
						id={popoverId}
						role="dialog"
						aria-label="Date picker"
						className="absolute top-full left-0 mt-1 z-10 bg-surface border border-surface-border rounded-lg shadow-lg p-3 w-72 motion-safe:animate-[fadeScaleIn_150ms_ease-out]"
					>
						<div className="flex items-center justify-between mb-3">
							<button
								type="button"
								aria-label="Previous month"
								onClick={goToPrevMonth}
								className={NAV_BTN}
							>
								<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
									<path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</button>

							<span className="text-sm font-medium text-text">
								{MONTH_NAMES[displayMonth.month]} {displayMonth.year}
							</span>

							<button
								type="button"
								aria-label="Next month"
								onClick={goToNextMonth}
								className={NAV_BTN}
							>
								<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
									<path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</button>
						</div>

						<div className="grid grid-cols-7 mb-1">
							{DAY_HEADERS.map(d => (
								<div key={d} className="flex items-center justify-center h-8 text-xs font-medium text-text-muted">
									{d}
								</div>
							))}
						</div>

						<div className="grid grid-cols-7">
							{days.map(({ date, isCurrentMonth }, i) =>
							{
								const selected  = value ? isSameDay(date, value) : false;
								const today     = isToday(date);
								const dayDisabled = isDayDisabled(date);

								const dayClass = [
									'flex items-center justify-center h-8 w-full rounded-md text-sm transition-colors duration-150 ease-out',
									'focus:outline-none',
									'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-ring',
									selected
										? 'bg-brand text-brand-fg'
										: today
											? 'ring-1 ring-brand text-text hover:bg-surface-hover'
											: 'hover:bg-surface-hover',
									isCurrentMonth ? 'text-text' : 'text-text-muted',
									selected ? 'text-brand-fg' : '',
									dayDisabled ? 'opacity-40 pointer-events-none' : 'cursor-pointer',
								].join(' ');

								const fullLabel = date.toLocaleDateString('en-US', {
									weekday: 'long',
									year:    'numeric',
									month:   'long',
									day:     'numeric',
								});

								return (
									<button
										key={i}
										type="button"
										aria-label={fullLabel}
										aria-pressed={selected}
										disabled={dayDisabled}
										onClick={() => selectDay(date)}
										className={dayClass}
									>
										{date.getDate()}
									</button>
								);
							})}
						</div>
					</div>
				)}
			</div>

			{error && (
				<p id={`${inputId}-error`} className="text-sm text-input-error">
					{error}
				</p>
			)}
			{!error && hint && (
				<p id={`${inputId}-hint`} className="text-sm text-text-muted">
					{hint}
				</p>
			)}
		</div>
	);
}
