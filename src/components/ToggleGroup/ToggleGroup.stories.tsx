import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from './ToggleGroup';

const meta: Meta<typeof ToggleGroup> = {
	title:     'Components/Inputs/ToggleGroup',
	component: ToggleGroup,
	tags:      ['autodocs'],
	argTypes:  {
		type:          { control: 'radio', options: ['single', 'multiple'] },
		size:          { control: 'radio', options: ['sm', 'md', 'lg'] },
		disabled:      { control: 'boolean' },
		onValueChange: { action: 'onValueChange' },
	},
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const SingleSelection: Story = {
	render: () =>
	{
		const [value, setValue] = useState('left');

		return (
			<div className="p-8">
				<ToggleGroup type="single" value={value} onValueChange={v => setValue(v as string)}>
					<ToggleGroupItem value="left">Left</ToggleGroupItem>
					<ToggleGroupItem value="center">Center</ToggleGroupItem>
					<ToggleGroupItem value="right">Right</ToggleGroupItem>
				</ToggleGroup>
			</div>
		);
	},
};

export const MultipleSelection: Story = {
	render: () =>
	{
		const [value, setValue] = useState<string[]>(['bold']);

		return (
			<div className="p-8">
				<ToggleGroup type="multiple" value={value} onValueChange={v => setValue(v as string[])}>
					<ToggleGroupItem value="bold">Bold</ToggleGroupItem>
					<ToggleGroupItem value="italic">Italic</ToggleGroupItem>
					<ToggleGroupItem value="underline">Underline</ToggleGroupItem>
				</ToggleGroup>
			</div>
		);
	},
};

export const Sizes: Story = {
	render: () =>
	{
		const [sm, setSm] = useState('a');
		const [md, setMd] = useState('a');
		const [lg, setLg] = useState('a');

		return (
			<div className="p-8 flex flex-col gap-6">
				<div className="flex flex-col gap-2">
					<span className="text-xs text-text-muted">sm</span>
					<ToggleGroup type="single" size="sm" value={sm} onValueChange={v => setSm(v as string)}>
						<ToggleGroupItem value="a">Option A</ToggleGroupItem>
						<ToggleGroupItem value="b">Option B</ToggleGroupItem>
						<ToggleGroupItem value="c">Option C</ToggleGroupItem>
					</ToggleGroup>
				</div>

				<div className="flex flex-col gap-2">
					<span className="text-xs text-text-muted">md (default)</span>
					<ToggleGroup type="single" size="md" value={md} onValueChange={v => setMd(v as string)}>
						<ToggleGroupItem value="a">Option A</ToggleGroupItem>
						<ToggleGroupItem value="b">Option B</ToggleGroupItem>
						<ToggleGroupItem value="c">Option C</ToggleGroupItem>
					</ToggleGroup>
				</div>

				<div className="flex flex-col gap-2">
					<span className="text-xs text-text-muted">lg</span>
					<ToggleGroup type="single" size="lg" value={lg} onValueChange={v => setLg(v as string)}>
						<ToggleGroupItem value="a">Option A</ToggleGroupItem>
						<ToggleGroupItem value="b">Option B</ToggleGroupItem>
						<ToggleGroupItem value="c">Option C</ToggleGroupItem>
					</ToggleGroup>
				</div>
			</div>
		);
	},
};

export const DisabledGroup: Story = {
	render: () =>
	{
		return (
			<div className="p-8">
				<ToggleGroup type="single" value="left" onValueChange={() => {}} disabled>
					<ToggleGroupItem value="left">Left</ToggleGroupItem>
					<ToggleGroupItem value="center">Center</ToggleGroupItem>
					<ToggleGroupItem value="right">Right</ToggleGroupItem>
				</ToggleGroup>
			</div>
		);
	},
};

export const DisabledItem: Story = {
	render: () =>
	{
		const [value, setValue] = useState('left');

		return (
			<div className="p-8">
				<ToggleGroup type="single" value={value} onValueChange={v => setValue(v as string)}>
					<ToggleGroupItem value="left">Left</ToggleGroupItem>
					<ToggleGroupItem value="center" disabled>Center</ToggleGroupItem>
					<ToggleGroupItem value="right">Right</ToggleGroupItem>
				</ToggleGroup>
			</div>
		);
	},
};

export const WithIcons: Story = {
	render: () =>
	{
		const [align, setAlign] = useState<string[]>(['bold', 'italic']);

		return (
			<div className="p-8">
				<ToggleGroup type="multiple" value={align} onValueChange={v => setAlign(v as string[])}>
					<ToggleGroupItem value="bold" aria-label="Bold">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
							<path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
							<path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
						</svg>
					</ToggleGroupItem>
					<ToggleGroupItem value="italic" aria-label="Italic">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
							<line x1="19" y1="4" x2="10" y2="4" />
							<line x1="14" y1="20" x2="5" y2="20" />
							<line x1="15" y1="4" x2="9" y2="20" />
						</svg>
					</ToggleGroupItem>
					<ToggleGroupItem value="underline" aria-label="Underline">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
							<path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" />
							<line x1="4" y1="21" x2="20" y2="21" />
						</svg>
					</ToggleGroupItem>
				</ToggleGroup>
			</div>
		);
	},
};
