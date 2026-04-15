import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CalendarInput from './CalendarInput';

describe('CalendarInput', () =>
{
	it('renders without errors', () =>
	{
		render(<CalendarInput />);
		expect(screen.getByRole('button', { name: /select a date/i })).toBeDefined();
	});

	it('shows placeholder text when no value is set', () =>
	{
		render(<CalendarInput placeholder="Pick a date" />);
		expect(screen.getByText('Pick a date')).toBeDefined();
	});

	it('renders a calendar icon inside the trigger', () =>
	{
		render(<CalendarInput />);
		const svg = document.querySelector('svg');
		expect(svg).not.toBeNull();
	});

	it('shows formatted date when value is provided', () =>
	{
		render(<CalendarInput value={new Date(2026, 3, 13)} />);
		expect(screen.getByText('Apr 13, 2026')).toBeDefined();
	});

	it('opens the calendar popover on click', () =>
	{
		render(<CalendarInput />);
		const trigger = screen.getByRole('button', { name: /select a date/i });
		fireEvent.click(trigger);
		expect(screen.getByRole('dialog', { name: 'Date picker' })).toBeDefined();
	});

	it('closes the calendar popover on Escape', () =>
	{
		render(<CalendarInput />);
		const trigger = screen.getByRole('button', { name: /select a date/i });
		fireEvent.click(trigger);
		expect(screen.getByRole('dialog')).toBeDefined();

		fireEvent.keyDown(screen.getByRole('dialog').parentElement!, { key: 'Escape' });
		expect(screen.queryByRole('dialog')).toBeNull();
	});

	it('shows month navigation in the popover', () =>
	{
		render(<CalendarInput value={new Date(2026, 3, 13)} />);
		fireEvent.click(screen.getByRole('button', { name: /apr 13, 2026/i }));
		expect(screen.getByRole('button', { name: 'Previous month' })).toBeDefined();
		expect(screen.getByRole('button', { name: 'Next month' })).toBeDefined();
		expect(screen.getByText('April 2026')).toBeDefined();
	});

	it('navigates to the previous month', () =>
	{
		render(<CalendarInput value={new Date(2026, 3, 13)} />);
		fireEvent.click(screen.getByRole('button', { name: /apr 13, 2026/i }));
		fireEvent.click(screen.getByRole('button', { name: 'Previous month' }));
		expect(screen.getByText('March 2026')).toBeDefined();
	});

	it('navigates to the next month', () =>
	{
		render(<CalendarInput value={new Date(2026, 3, 13)} />);
		fireEvent.click(screen.getByRole('button', { name: /apr 13, 2026/i }));
		fireEvent.click(screen.getByRole('button', { name: 'Next month' }));
		expect(screen.getByText('May 2026')).toBeDefined();
	});

	it('calls onChange and closes when a day is selected', () =>
	{
		const handleChange = vi.fn();
		render(<CalendarInput value={new Date(2026, 3, 13)} onChange={handleChange} />);
		fireEvent.click(screen.getByRole('button', { name: /apr 13, 2026/i }));

		const dayBtn = screen.getByRole('button', {
			name: /Monday, April 13, 2026/i,
		});
		fireEvent.click(dayBtn);

		expect(handleChange).toHaveBeenCalledOnce();
		expect(screen.queryByRole('dialog')).toBeNull();
	});

	it('does not open when disabled', () =>
	{
		render(<CalendarInput disabled placeholder="Select a date" />);
		const trigger = screen.getByRole('button', { name: /select a date/i });
		fireEvent.click(trigger);
		expect(screen.queryByRole('dialog')).toBeNull();
	});

	it('applies disabled attribute to the trigger', () =>
	{
		render(<CalendarInput disabled />);
		const trigger = screen.getByRole('button', { name: /select a date/i });
		expect(trigger).toHaveProperty('disabled', true);
	});

	it('applies error border class when error is provided', () =>
	{
		render(<CalendarInput error="Invalid date" />);
		const trigger = screen.getByRole('button', { name: /select a date/i });
		expect(trigger.className).toContain('border-input-error');
	});

	it('renders error message text', () =>
	{
		render(<CalendarInput error="Date is required." />);
		expect(screen.getByText('Date is required.')).toBeDefined();
	});

	it('renders hint text when no error', () =>
	{
		render(<CalendarInput hint="Choose any future date." />);
		expect(screen.getByText('Choose any future date.')).toBeDefined();
	});

	it('renders label element', () =>
	{
		render(<CalendarInput label="Appointment date" />);
		expect(screen.getByText('Appointment date')).toBeDefined();
	});

	it('sets aria-haspopup="dialog" on the trigger', () =>
	{
		render(<CalendarInput />);
		const trigger = screen.getByRole('button', { name: /select a date/i });
		expect(trigger.getAttribute('aria-haspopup')).toBe('dialog');
	});

	it('sets aria-expanded correctly', () =>
	{
		render(<CalendarInput />);
		const trigger = screen.getByRole('button', { name: /select a date/i });
		expect(trigger.getAttribute('aria-expanded')).toBe('false');

		fireEvent.click(trigger);
		expect(trigger.getAttribute('aria-expanded')).toBe('true');
	});

	it('sets aria-pressed on the selected day button', () =>
	{
		render(<CalendarInput value={new Date(2026, 3, 13)} />);
		fireEvent.click(screen.getByRole('button', { name: /apr 13, 2026/i }));

		const selectedDay = screen.getByRole('button', {
			name: /Monday, April 13, 2026/i,
		});
		expect(selectedDay.getAttribute('aria-pressed')).toBe('true');
	});

	it('applies normal border class when no error', () =>
	{
		render(<CalendarInput />);
		const trigger = screen.getByRole('button', { name: /select a date/i });
		expect(trigger.className).toContain('border-input-border');
	});

	it('days outside minDate are disabled', () =>
	{
		render(
			<CalendarInput
				value={new Date(2026, 3, 13)}
				minDate={new Date(2026, 3, 10)}
			/>
		);
		fireEvent.click(screen.getByRole('button', { name: /apr 13, 2026/i }));

		const earlyDay = screen.getByRole('button', {
			name: /Wednesday, April 1, 2026/i,
		});
		expect(earlyDay).toHaveProperty('disabled', true);
	});
});
