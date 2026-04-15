import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';

const meta: Meta<typeof Tabs> = {
	title:     'Components/Navigation/Tabs',
	component: Tabs,
	tags:      ['autodocs'],
	argTypes:  {
		value:         { control: 'text' },
		onValueChange: { action: 'onValueChange' },
	},
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Overview: Story = {
	render: () =>
	{
		const [active, setActive] = useState('overview');

		return (
			<div className="p-8 max-w-xl">
				<Tabs value={active} onValueChange={setActive}>
					<TabsList>
						<TabsTrigger value="overview">Overview</TabsTrigger>
						<TabsTrigger value="analytics">Analytics</TabsTrigger>
						<TabsTrigger value="settings">Settings</TabsTrigger>
						<TabsTrigger value="billing" disabled>Billing</TabsTrigger>
					</TabsList>

					<TabsContent value="overview">
						<p className="text-text-muted text-sm">
							This is the Overview panel. It shows a high-level summary of the product.
						</p>
					</TabsContent>

					<TabsContent value="analytics">
						<p className="text-text-muted text-sm">
							This is the Analytics panel. Charts and metrics live here.
						</p>
					</TabsContent>

					<TabsContent value="settings">
						<p className="text-text-muted text-sm">
							This is the Settings panel. Manage configuration options here.
						</p>
					</TabsContent>

					<TabsContent value="billing">
						<p className="text-text-muted text-sm">
							This is the Billing panel. Subscription details are shown here.
						</p>
					</TabsContent>
				</Tabs>
			</div>
		);
	},
};

export const Playground: Story = {
	render: (args) =>
	{
		const [active, setActive] = useState(args.value ?? 'tab-one');

		return (
			<div className="p-8 max-w-xl">
				<Tabs
					value={active}
					onValueChange={(v) =>
					{
						setActive(v);
						args.onValueChange?.(v);
					}}
					className={args.className}
				>
					<TabsList>
						<TabsTrigger value="tab-one">Tab One</TabsTrigger>
						<TabsTrigger value="tab-two">Tab Two</TabsTrigger>
						<TabsTrigger value="tab-three">Tab Three</TabsTrigger>
					</TabsList>

					<TabsContent value="tab-one">
						<p className="text-text-muted text-sm">Content for Tab One.</p>
					</TabsContent>

					<TabsContent value="tab-two">
						<p className="text-text-muted text-sm">Content for Tab Two.</p>
					</TabsContent>

					<TabsContent value="tab-three">
						<p className="text-text-muted text-sm">Content for Tab Three.</p>
					</TabsContent>
				</Tabs>
			</div>
		);
	},
	args: {
		value: 'tab-one',
	},
};
