import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Textarea from './Textarea';

const meta: Meta<typeof Textarea> = {
	title:     'Components/Inputs/Textarea',
	component: Textarea,
	tags:      ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Overview: Story = {
	render: () => (
		<div className="flex gap-10 p-8">
			<section className="flex flex-col gap-3 flex-1">
				<p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">With label</p>
				<div className="flex flex-col gap-4">
					<Textarea label="Default" placeholder="Placeholder text" />
					<Textarea label="With hint" placeholder="Placeholder text" hint="Maximum 500 characters." />
					<Textarea label="With error" placeholder="Placeholder text" value="bad input" error="This field is required." />
					<Textarea label="Disabled" placeholder="Placeholder text" disabled value="This field is locked." />
				</div>
			</section>

			<section className="flex flex-col gap-3 flex-1">
				<p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Without label</p>
				<div className="flex flex-col gap-4">
					<Textarea placeholder="Default" />
					<Textarea placeholder="With hint" hint="Maximum 500 characters." />
					<Textarea placeholder="With error" value="bad input" error="This field is required." />
					<Textarea placeholder="Disabled" disabled value="This field is locked." />
				</div>
			</section>
		</div>
	),
};

export const Playground: Story = {
	args: {
		label:       'Message',
		placeholder: 'Type something here…',
	},
};
