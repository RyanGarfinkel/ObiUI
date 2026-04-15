import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import Switch from './Switch';

const meta: Meta<typeof Switch> = {
	title:     'Components/Inputs/Switch',
	component: Switch,
	tags:      ['autodocs'],
	argTypes:  {
		checked:         { control: 'boolean' },
		disabled:        { control: 'boolean' },
		label:           { control: 'text' },
		hint:            { control: 'text' },
	},
};

export default meta;
type Story = StoryObj<typeof Switch>;

function Controlled(props: Partial<React.ComponentProps<typeof Switch>>)
{
	const [checked, setChecked] = useState(props.checked ?? false);
	return <Switch {...props} checked={checked} onCheckedChange={setChecked} />;
}

export const Overview: Story = {
	render: () => (
		<div className="flex flex-col gap-4 p-8">
			<p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">States</p>
			<Controlled />
			<Controlled checked />
			<Controlled label="Enable notifications" />
			<Controlled checked label="Dark mode" />
			<Controlled label="Auto-save" hint="Changes are saved every 30 seconds." />
			<Controlled checked label="Beta features" hint="Opt in to early access features." />
			<Controlled label="Disabled off" disabled />
			<Controlled checked label="Disabled on" disabled />
		</div>
	),
};

export const Playground: Story = {
	render: (args) =>
	{
		const [checked, setChecked] = useState(args.checked ?? false);
		return (
			<div className="p-8">
				<Switch {...args} checked={checked} onCheckedChange={setChecked} />
			</div>
		);
	},
	args: {
		label:    'Enable feature',
		hint:     'Optional hint text.',
		checked:  false,
		disabled: false,
	},
};
