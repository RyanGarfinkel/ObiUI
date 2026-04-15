import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Accordion, { AccordionItem, AccordionTrigger, AccordionContent } from './Accordion';

const meta: Meta<typeof Accordion> = {
	title:     'Components/Disclosure/Accordion',
	component: Accordion,
	tags:      ['autodocs'],
	argTypes:  {
		type:        { control: 'radio', options: ['single', 'multiple'] },
		collapsible: { control: 'boolean' },
	},
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Single: Story = {
	render: () => (
		<div className="p-8 max-w-lg">
			<Accordion type="single" collapsible defaultValue="item-1">
				<AccordionItem value="item-1">
					<AccordionTrigger>What is a design system?</AccordionTrigger>
					<AccordionContent>
						A design system is a collection of reusable components, guidelines, and tokens that teams
						use to build consistent, accessible products at scale.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-2">
					<AccordionTrigger>Why use design tokens?</AccordionTrigger>
					<AccordionContent>
						Tokens abstract raw values like hex colors and pixel sizes behind semantic names.
						This makes it easy to update the visual language in one place and have it propagate everywhere.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-3">
					<AccordionTrigger>How do I contribute a new component?</AccordionTrigger>
					<AccordionContent>
						Follow the guide in <code>.github/rules/new-component.md</code>. Every component requires
						a TSX file, a Storybook stories file, a Vitest test file, and a spec.md.
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	),
};

export const Multiple: Story = {
	render: () => (
		<div className="p-8 max-w-lg">
			<Accordion type="multiple" defaultValue={['item-1', 'item-3']}>
				<AccordionItem value="item-1">
					<AccordionTrigger>Notifications</AccordionTrigger>
					<AccordionContent>
						Choose how and when you receive notifications about activity on your account.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-2">
					<AccordionTrigger>Privacy</AccordionTrigger>
					<AccordionContent>
						Control who can see your profile and what data is shared with third-party services.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-3">
					<AccordionTrigger>Security</AccordionTrigger>
					<AccordionContent>
						Manage two-factor authentication, active sessions, and connected devices.
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	),
};

export const WithDisabledItem: Story = {
	render: () => (
		<div className="p-8 max-w-lg">
			<Accordion type="single" collapsible>
				<AccordionItem value="item-1">
					<AccordionTrigger>Available option</AccordionTrigger>
					<AccordionContent>This item can be expanded normally.</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-2">
					<AccordionTrigger disabled>Disabled option</AccordionTrigger>
					<AccordionContent>This content is not reachable.</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-3">
					<AccordionTrigger>Another available option</AccordionTrigger>
					<AccordionContent>This item can also be expanded.</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	),
};

export const Playground: Story = {
	args: {
		type:        'single',
		collapsible: true,
	},
	render: (args) => (
		<div className="p-8 max-w-lg">
			<Accordion {...args} defaultValue="item-1">
				<AccordionItem value="item-1">
					<AccordionTrigger>First item</AccordionTrigger>
					<AccordionContent>Content for the first accordion item.</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-2">
					<AccordionTrigger>Second item</AccordionTrigger>
					<AccordionContent>Content for the second accordion item.</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-3">
					<AccordionTrigger>Third item</AccordionTrigger>
					<AccordionContent>Content for the third accordion item.</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	),
};
