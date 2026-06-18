import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';

describe('Button', () =>
{
	it('renders children', () =>
	{
		render(<Button>Save</Button>);
		expect(screen.getByRole('button', { name: 'Save' })).toBeDefined();
	});

	it('calls onClick when clicked', async () =>
	{
		const onClick = vi.fn();
		render(<Button onClick={onClick}>Save</Button>);
		await userEvent.click(screen.getByRole('button'));
		expect(onClick).toHaveBeenCalledOnce();
	});

	it('does not call onClick when disabled', async () =>
	{
		const onClick = vi.fn();
		render(<Button onClick={onClick} disabled>Save</Button>);
		await userEvent.click(screen.getByRole('button'));
		expect(onClick).not.toHaveBeenCalled();
	});

	it('activates with Enter key', async () =>
	{
		const onClick = vi.fn();
		render(<Button onClick={onClick}>Save</Button>);
		screen.getByRole('button').focus();
		await userEvent.keyboard('{Enter}');
		expect(onClick).toHaveBeenCalledOnce();
	});

	it('is reachable by keyboard when enabled', () =>
	{
		render(<Button>Save</Button>);
		expect(screen.getByRole('button')).not.toHaveProperty('disabled', true);
		expect(screen.getByRole('button').getAttribute('tabindex')).not.toBe('-1');
	});

	it('has a visible focus ring for keyboard users', () =>
	{
		render(<Button>Save</Button>);
		expect(screen.getByRole('button').className).toContain('focus-visible:ring-2');
	});

	it('is disabled when disabled prop is set', () =>
	{
		render(<Button disabled>Save</Button>);
		expect(screen.getByRole('button')).toHaveProperty('disabled', true);
	});

	it('forwards type attribute', () =>
	{
		render(<Button type='submit'>Save</Button>);
		expect(screen.getByRole('button').getAttribute('type')).toBe('submit');
	});

	it('forwards aria-label', () =>
	{
		render(<Button size='icon' aria-label='Delete item'><span /></Button>);
		expect(screen.getByRole('button', { name: 'Delete item' })).toBeDefined();
	});

	it('merges custom className', () =>
	{
		render(<Button className='mt-4'>Save</Button>);
		expect(screen.getByRole('button').className).toContain('mt-4');
	});
});

describe('Button — loading state', () =>
{
	it('renders a spinner and hides children when loading', () =>
	{
		render(<Button loading>Save</Button>);
		expect(screen.queryByText('Save')).toBeNull();
		expect(screen.getByRole('button').querySelector('svg')).not.toBeNull();
	});

	it('sets aria-busy when loading', () =>
	{
		render(<Button loading>Save</Button>);
		expect(screen.getByRole('button').getAttribute('aria-busy')).toBe('true');
	});

	it('does not set aria-busy when not loading', () =>
	{
		render(<Button>Save</Button>);
		expect(screen.getByRole('button').getAttribute('aria-busy')).toBeNull();
	});

	it('does not call onClick when loading', async () =>
	{
		const onClick = vi.fn();
		render(<Button loading onClick={onClick}>Save</Button>);
		await userEvent.click(screen.getByRole('button'));
		expect(onClick).not.toHaveBeenCalled();
	});

	it('is disabled when loading', () =>
	{
		render(<Button loading>Save</Button>);
		expect(screen.getByRole('button')).toHaveProperty('disabled', true);
	});
});

describe('Button — size="icon"', () =>
{
	it('renders as a square', () =>
	{
		render(<Button size='icon' aria-label='Close'><span /></Button>);
		const btn = screen.getByRole('button');
		expect(btn.className).toContain('w-9');
		expect(btn.className).toContain('h-9');
	});

	it('does not apply horizontal padding', () =>
	{
		render(<Button size='icon' aria-label='Close'><span /></Button>);
		expect(screen.getByRole('button').className).not.toContain('px-');
	});
});
