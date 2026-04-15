import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Button from './Button';

const meta: Meta<typeof Button> = {
	title:     'Components/Actions/Button',
	component: Button,
	tags:      ['autodocs'],
	argTypes:  {
		variant: { control: 'select', options: ['primary', 'secondary', 'outlined', 'ghost', 'link', 'destructive'] },
		size:    { control: 'select', options: ['sm', 'md', 'lg'] },
	},
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Overview: Story = {
	render: () => (
		<div className="flex flex-col gap-10 p-8">
			<section className="flex flex-col gap-3">
				<p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Variants</p>
				<div className="flex flex-wrap items-center gap-3">
					<Button variant="primary">Primary</Button>
					<Button variant="secondary">Secondary</Button>
					<Button variant="outlined">Outlined</Button>
					<Button variant="ghost">Ghost</Button>
					<Button variant="link">Link</Button>
					<Button variant="destructive">Destructive</Button>
				</div>
			</section>

			<section className="flex flex-col gap-3">
				<p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Sizes</p>
				<div className="flex flex-wrap items-end gap-3">
					<Button size="sm">Small</Button>
					<Button size="md">Medium</Button>
					<Button size="lg">Large</Button>
				</div>
			</section>

			<section className="flex flex-col gap-3">
				<p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Disabled</p>
				<div className="flex flex-wrap items-center gap-3">
					<Button variant="primary" disabled>Primary</Button>
					<Button variant="secondary" disabled>Secondary</Button>
					<Button variant="outlined" disabled>Outlined</Button>
					<Button variant="ghost" disabled>Ghost</Button>
					<Button variant="link" disabled>Link</Button>
					<Button variant="destructive" disabled>Destructive</Button>
				</div>
			</section>
		</div>
	),
};

export const Playground: Story = {
	args: {
		variant:  'primary',
		size:     'md',
		children: 'Button',
	},
};
