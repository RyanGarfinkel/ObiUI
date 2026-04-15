import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { RadioGroup, RadioItem } from './Radio';

const meta: Meta<typeof RadioGroup> = {
	title:     'Components/Inputs/Radio',
	component: RadioGroup,
	tags:      ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Overview: Story = {
	render: () =>
	{
		const [value, setValue] = useState('standard');

		return (
			<div className="flex flex-col gap-8 p-8">
				<section className="flex flex-col gap-3">
					<p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Shipping method</p>
					<RadioGroup name="shipping" value={value} onValueChange={setValue}>
						<RadioItem
							value="standard"
							label="Standard shipping"
							hint="Arrives in 5–7 business days"
						/>
						<RadioItem
							value="express"
							label="Express shipping"
							hint="Arrives in 2–3 business days"
						/>
						<RadioItem
							value="overnight"
							label="Overnight shipping"
						/>
						<RadioItem
							value="pickup"
							label="In-store pickup"
							hint="Only available at select locations"
							disabled
						/>
					</RadioGroup>
				</section>

				<section className="flex flex-col gap-3">
					<p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Selected value</p>
					<p className="text-sm text-text-muted font-mono">{value}</p>
				</section>
			</div>
		);
	},
};

export const Playground: Story = {
	render: (args) =>
	{
		const [value, setValue] = useState('option-a');

		return (
			<div className="p-8">
				<RadioGroup {...args} value={value} onValueChange={setValue}>
					<RadioItem value="option-a" label="Option A" />
					<RadioItem value="option-b" label="Option B" />
					<RadioItem value="option-c" label="Option C" hint="This option has a hint" />
				</RadioGroup>
			</div>
		);
	},
	args: {
		name: 'playground',
	},
};
