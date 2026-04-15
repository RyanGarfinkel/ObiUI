import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Breadcrumb from './Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
	title:     'Components/Navigation/Breadcrumb',
	component: Breadcrumb,
	tags:      ['autodocs'],
	argTypes:  {
		separator: { control: 'text' },
	},
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Overview: Story = {
	render: () => (
		<div className="flex flex-col gap-6 p-8">
			<Breadcrumb
				items={[
					{ label: 'Home', href: '/' },
					{ label: 'Settings' },
				]}
			/>

			<Breadcrumb
				items={[
					{ label: 'Home', href: '/' },
					{ label: 'Products', href: '/products' },
					{ label: 'Keyboards' },
				]}
			/>

			<Breadcrumb
				items={[
					{ label: 'Home', href: '/' },
					{ label: 'Products', href: '/products' },
					{ label: 'Keyboards', href: '/products/keyboards' },
					{ label: 'Mechanical TKL' },
				]}
			/>
		</div>
	),
};

export const Playground: Story = {
	args: {
		items: [
			{ label: 'Home', href: '/' },
			{ label: 'Products', href: '/products' },
			{ label: 'Keyboards' },
		],
		separator: '/',
	},
};
