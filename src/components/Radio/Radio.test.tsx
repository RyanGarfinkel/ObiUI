import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { RadioGroup, RadioItem } from './Radio';

const renderGroup = (value = 'a', onValueChange = vi.fn()) => {
	return render(
		<RadioGroup name='test-group' value={value} onValueChange={onValueChange}>
			<RadioItem value='a' label='Option A' />
			<RadioItem value='b' label='Option B' hint='A helpful hint' />
			<RadioItem value='c' label='Option C' disabled />
		</RadioGroup>
	);
};

describe('RadioGroup / RadioItem', () =>
{
	it('renders all items', () =>
	{
		renderGroup();
		expect(screen.getByLabelText('Option A')).toBeDefined();
		expect(screen.getByLabelText('Option B', { exact: false })).toBeDefined();
		expect(screen.getByLabelText('Option C')).toBeDefined();
	});

	it('calls onValueChange when an item is clicked', () =>
	{
		const onValueChange = vi.fn();
		renderGroup('a', onValueChange);

		fireEvent.click(screen.getByLabelText('Option B', { exact: false }));
		expect(onValueChange).toHaveBeenCalledWith('b');
	});

	it('does not call onValueChange when a disabled item is clicked', () =>
	{
		const onValueChange = vi.fn();
		renderGroup('a', onValueChange);

		fireEvent.click(screen.getByLabelText('Option C'));
		expect(onValueChange).not.toHaveBeenCalled();
	});

	it('selected item input is checked', () =>
	{
		renderGroup('b');
		const inputB = screen.getByLabelText('Option B', { exact: false }) as HTMLInputElement;
		expect(inputB.checked).toBe(true);
	});

	it('non-selected items are not checked', () =>
	{
		renderGroup('b');
		const inputA = screen.getByLabelText('Option A') as HTMLInputElement;
		const inputC = screen.getByLabelText('Option C') as HTMLInputElement;
		expect(inputA.checked).toBe(false);
		expect(inputC.checked).toBe(false);
	});

	it('disabled item has disabled attribute', () =>
	{
		renderGroup();
		const inputC = screen.getByLabelText('Option C') as HTMLInputElement;
		expect(inputC.disabled).toBe(true);
	});

	it('disabled item label carries opacity and pointer-events classes', () =>
	{
		renderGroup();
		const label = screen.getByText('Option C').closest('label');
		expect(label?.className).toContain('opacity-40');
		expect(label?.className).toContain('pointer-events-none');
	});

	it('all inputs have type="radio"', () =>
	{
		renderGroup();
		const radios = screen.getAllByRole('radio');
		for(const radio of radios)
			expect(radio.getAttribute('type')).toBe('radio');
	});

	it('all inputs share the group name', () =>
	{
		renderGroup();
		const radios = screen.getAllByRole('radio');
		for(const radio of radios)
			expect(radio.getAttribute('name')).toBe('test-group');
	});

	it('renders hint text', () =>
	{
		renderGroup();
		expect(screen.getByText('A helpful hint')).toBeDefined();
	});

	it('radiogroup has correct role', () =>
	{
		renderGroup();
		expect(screen.getByRole('radiogroup')).toBeDefined();
	});

	it('each input carries aria-checked reflecting checked state', () =>
	{
		renderGroup('a');
		expect(screen.getByLabelText('Option A').getAttribute('aria-checked')).toBe('true');
		expect(screen.getByLabelText('Option B', { exact: false }).getAttribute('aria-checked')).toBe('false');
	});

	it('hidden input is sr-only', () =>
	{
		renderGroup();
		const radios = screen.getAllByRole('radio');
		for(const radio of radios)
			expect(radio.className).toContain('sr-only');
	});

	it('selected visual circle carries border-brand class', () =>
	{
		renderGroup('a');
		const label = screen.getByText('Option A').closest('label');
		const circle = label?.querySelector('.rounded-full.border-2');
		expect(circle?.className).toContain('border-brand');
	});

	it('unselected visual circle carries border-surface-border class', () =>
	{
		renderGroup('a');
		const label = screen.getByText('Option B').closest('label');
		const circle = label?.querySelector('.rounded-full.border-2');
		expect(circle?.className).toContain('border-surface-border');
	});

	it('ArrowDown moves focus to next item without selecting', () =>
	{
		const onValueChange = vi.fn();
		renderGroup('a', onValueChange);

		const inputA = screen.getByLabelText('Option A') as HTMLInputElement;
		inputA.focus();
		fireEvent.keyDown(inputA, { key: 'ArrowDown' });

		expect(document.activeElement).toBe(screen.getByLabelText('Option B', { exact: false }));
		expect(onValueChange).not.toHaveBeenCalled();
	});

	it('ArrowUp moves focus to previous item without selecting', () =>
	{
		const onValueChange = vi.fn();
		renderGroup('b', onValueChange);

		const inputB = screen.getByLabelText('Option B', { exact: false }) as HTMLInputElement;
		inputB.focus();
		fireEvent.keyDown(inputB, { key: 'ArrowUp' });

		expect(document.activeElement).toBe(screen.getByLabelText('Option A'));
		expect(onValueChange).not.toHaveBeenCalled();
	});

	it('ArrowDown wraps from last non-disabled item to first', () =>
	{
		const onValueChange = vi.fn();
		renderGroup('a', onValueChange);

		const inputB = screen.getByLabelText('Option B', { exact: false }) as HTMLInputElement;
		inputB.focus();
		fireEvent.keyDown(inputB, { key: 'ArrowDown' });

		expect(document.activeElement).toBe(screen.getByLabelText('Option A'));
		expect(onValueChange).not.toHaveBeenCalled();
	});

	it('Space selects the focused item', () =>
	{
		const onValueChange = vi.fn();
		renderGroup('a', onValueChange);

		const inputB = screen.getByLabelText('Option B', { exact: false }) as HTMLInputElement;
		inputB.focus();
		fireEvent.keyDown(inputB, { key: ' ' });

		expect(onValueChange).toHaveBeenCalledWith('b');
	});

	it('Enter selects the focused item', () =>
	{
		const onValueChange = vi.fn();
		renderGroup('a', onValueChange);

		const inputB = screen.getByLabelText('Option B', { exact: false }) as HTMLInputElement;
		inputB.focus();
		fireEvent.keyDown(inputB, { key: 'Enter' });

		expect(onValueChange).toHaveBeenCalledWith('b');
	});

	it('ArrowDown skips disabled items', () =>
	{
		const onValueChange = vi.fn();
		renderGroup('a', onValueChange);

		const inputA = screen.getByLabelText('Option A') as HTMLInputElement;
		inputA.focus();
		fireEvent.keyDown(inputA, { key: 'ArrowDown' });

		expect(document.activeElement).toBe(screen.getByLabelText('Option B', { exact: false }));
	});
});
