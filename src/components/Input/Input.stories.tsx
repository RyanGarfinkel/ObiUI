import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Input from './Input';

const meta: Meta<typeof Input> = {
	title:     'Components/Inputs/Input',
	component: Input,
	tags:      ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Overview: Story = {
	render: () => (
		<div className="flex gap-10 p-8">
			<section className="flex flex-col gap-3 flex-1">
				<p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">With label</p>
				<div className="flex flex-col gap-4">
					<Input label="Default" placeholder="Placeholder text" />
					<Input label="With hint" placeholder="Placeholder text" hint="Only letters, numbers, and underscores." />
					<Input label="With error" placeholder="Placeholder text" value="bad input" error="Enter a valid email address." />
					<Input label="Disabled" placeholder="Placeholder text" disabled value="locked@example.com" />
				</div>
			</section>

			<section className="flex flex-col gap-3 flex-1">
				<p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Without label</p>
				<div className="flex flex-col gap-4">
					<Input placeholder="Default" />
					<Input placeholder="With hint" hint="Only letters, numbers, and underscores." />
					<Input placeholder="With error" value="bad input" error="Enter a valid email address." />
					<Input placeholder="Disabled" disabled value="locked@example.com" />
				</div>
			</section>
		</div>
	),
};

export const Playground: Story = {
	args: {
		label:       'Email',
		placeholder: 'you@example.com',
	},
};
