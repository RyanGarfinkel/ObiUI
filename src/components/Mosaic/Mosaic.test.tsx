import { render, screen, fireEvent } from '@testing-library/react';
import Mosaic, { MosaicTile, MosaicTileLayout } from './Mosaic';
import { describe, it, expect, vi } from 'vitest';

const LAYOUT: MosaicTileLayout[] = [
	{ id: 'a', col: 1, row: 1, colSpan: 2, rowSpan: 1 },
	{ id: 'b', col: 3, row: 1, colSpan: 2, rowSpan: 1 },
	{ id: 'c', col: 1, row: 2, colSpan: 4, rowSpan: 2 },
];

const Base = ({ layout = LAYOUT, onLayoutChange = vi.fn() } = {}) => (
	<Mosaic layout={layout} onLayoutChange={onLayoutChange} cols={4} rowHeight={120} gap={12}>
		<MosaicTile id='a'>Tile A</MosaicTile>
		<MosaicTile id='b'>Tile B</MosaicTile>
		<MosaicTile id='c'>Tile C</MosaicTile>
	</Mosaic>
);

describe('Mosaic', () =>
{
	it('renders without errors', () =>
	{
		render(<Base />);
		expect(screen.getByRole('grid', { name: /mosaic/i })).toBeTruthy();
	});

	it('renders all tile content', () =>
	{
		render(<Base />);
		expect(screen.getByText('Tile A')).toBeTruthy();
		expect(screen.getByText('Tile B')).toBeTruthy();
		expect(screen.getByText('Tile C')).toBeTruthy();
	});

	it('applies explicit grid-column placement', () =>
	{
		const { container } = render(<Base />);
		const tiles = Array.from(container.querySelectorAll('[style*="grid-column"]')) as HTMLElement[];
		const columns = tiles.map(el => el.style.gridColumn);
		expect(columns).toContain('1 / span 2');
		expect(columns).toContain('3 / span 2');
		expect(columns).toContain('1 / span 4');
	});

	it('applies explicit grid-row placement', () =>
	{
		const { container } = render(<Base />);
		const tiles = Array.from(container.querySelectorAll('[style*="grid-row"]')) as HTMLElement[];
		const rows = tiles.map(el => el.style.gridRow);
		expect(rows).toContain('1 / span 1');
		expect(rows).toContain('2 / span 2');
	});

	it('renders a drag handle for each tile', () =>
	{
		render(<Base />);
		const handles = screen.getAllByLabelText(/drag to reposition/i);
		expect(handles).toHaveLength(3);
	});

	it('renders a resize button for each tile', () =>
	{
		render(<Base />);
		const buttons = screen.getAllByLabelText(/resize/i);
		expect(buttons).toHaveLength(3);
	});

	it('opens size picker on resize button click', () =>
	{
		render(<Base />);
		const btn = screen.getAllByLabelText(/resize/i)[0];
		fireEvent.click(btn);
		expect(screen.getAllByLabelText(/\d+×\d+/).length).toBeGreaterThan(0);
	});

	it('closes size picker on Escape', () =>
	{
		render(<Base />);
		fireEvent.click(screen.getAllByLabelText(/resize/i)[0]);
		expect(screen.getAllByLabelText(/\d+×\d+/).length).toBeGreaterThan(0);
		fireEvent.keyDown(document, { key: 'Escape' });
		expect(screen.queryAllByLabelText(/\d+×\d+/)).toHaveLength(0);
	});

	it('calls onLayoutChange with updated spans when size is selected', () =>
	{
		const handler = vi.fn();
		render(<Base onLayoutChange={handler} />);
		// Tile c is at row=2 in a 3-row grid (effectiveRows=3), so max rowSpan=2. Picker offers 4×2.
		fireEvent.click(screen.getAllByLabelText(/resize/i)[2]);
		fireEvent.click(screen.getByLabelText('3×2'));
		expect(handler).toHaveBeenCalledWith(
			expect.arrayContaining([
				expect.objectContaining({ id: 'c', colSpan: 3, rowSpan: 2 }),
			])
		);
	});

	it('preserves col and row when resizing span', () =>
	{
		const handler = vi.fn();
		render(<Base onLayoutChange={handler} />);
		fireEvent.click(screen.getAllByLabelText(/resize/i)[2]);
		fireEvent.click(screen.getByLabelText('3×2'));
		const [updated] = handler.mock.calls[0][0].filter((t: MosaicTileLayout) => t.id === 'c');
		expect(updated.col).toBe(1);
		expect(updated.row).toBe(2);
	});

	it('calls render prop with colSpan and rowSpan', () =>
	{
		const renderProp = vi.fn(() => <div>content</div>);
		render(
			<Mosaic layout={LAYOUT} onLayoutChange={vi.fn()} cols={4} rowHeight={120} gap={12}>
				<MosaicTile id='a'>{renderProp}</MosaicTile>
				<MosaicTile id='b'>static</MosaicTile>
				<MosaicTile id='c'>static</MosaicTile>
			</Mosaic>
		);
		expect(renderProp).toHaveBeenCalledWith({ colSpan: 2, rowSpan: 1 });
	});

	it('throws when MosaicTile is rendered outside Mosaic', () =>
	{
		const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
		expect(() => render(<MosaicTile id='x'>orphan</MosaicTile>)).toThrow(
			'MosaicTile must be used inside Mosaic'
		);
		consoleError.mockRestore();
	});
});
