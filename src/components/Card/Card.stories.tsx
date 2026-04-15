import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Card, CardHeader, CardContent, CardFooter } from './Card';

const meta: Meta<typeof Card> = {
	title:     'Components/Display/Card',
	component: Card,
	tags:      ['autodocs'],
	argTypes:  {
		variant: { control: 'select', options: ['default', 'elevated', 'outline'] },
	},
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Overview: Story = {
	render: () => (
		<div className="flex flex-row gap-6 p-8">
			<Card variant="default" className="w-72">
				<CardHeader>
					<h3 className="text-base font-semibold text-text">Default</h3>
					<p className="text-sm text-text-muted mt-1">Surface background with a subtle border.</p>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-text-subtle">
						Card body content lives here. Use it for summaries, descriptions, or any supporting information.
					</p>
				</CardContent>
				<CardFooter>
					<button className="text-sm font-medium text-text-muted hover:text-text transition-colors duration-150">
						Cancel
					</button>
					<button className="text-sm font-medium text-text hover:text-text-muted transition-colors duration-150">
						Confirm
					</button>
				</CardFooter>
			</Card>

			<Card variant="elevated" className="w-72">
				<CardHeader>
					<h3 className="text-base font-semibold text-text">Elevated</h3>
					<p className="text-sm text-text-muted mt-1">Surface background with a drop shadow; no border.</p>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-text-subtle">
						Card body content lives here. Use it for summaries, descriptions, or any supporting information.
					</p>
				</CardContent>
				<CardFooter>
					<button className="text-sm font-medium text-text-muted hover:text-text transition-colors duration-150">
						Cancel
					</button>
					<button className="text-sm font-medium text-text hover:text-text-muted transition-colors duration-150">
						Confirm
					</button>
				</CardFooter>
			</Card>

			<Card variant="outline" className="w-72">
				<CardHeader>
					<h3 className="text-base font-semibold text-text">Outline</h3>
					<p className="text-sm text-text-muted mt-1">Transparent background with a heavier border.</p>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-text-subtle">
						Card body content lives here. Use it for summaries, descriptions, or any supporting information.
					</p>
				</CardContent>
				<CardFooter>
					<button className="text-sm font-medium text-text-muted hover:text-text transition-colors duration-150">
						Cancel
					</button>
					<button className="text-sm font-medium text-text hover:text-text-muted transition-colors duration-150">
						Confirm
					</button>
				</CardFooter>
			</Card>
		</div>
	),
};

export const Playground: Story = {
	args: {
		variant:   'default',
		className: 'w-72',
	},
	render: (args) => (
		<Card {...args}>
			<CardHeader>
				<h3 className="text-base font-semibold text-text">Card title</h3>
				<p className="text-sm text-text-muted mt-1">Supporting description text.</p>
			</CardHeader>
			<CardContent>
				<p className="text-sm text-text-subtle">
					Body content goes here.
				</p>
			</CardContent>
			<CardFooter>
				<button className="text-sm font-medium text-text-muted hover:text-text transition-colors duration-150">
					Cancel
				</button>
				<button className="text-sm font-medium text-text hover:text-text-muted transition-colors duration-150">
					Confirm
				</button>
			</CardFooter>
		</Card>
	),
};
