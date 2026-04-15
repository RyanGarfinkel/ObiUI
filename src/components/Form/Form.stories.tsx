import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Form, { FormSection, FormField, FormLabel, FormControl, FormDescription, FormMessage } from './Form';
import Button from '../Button/Button';
import Input from '../Input/Input';

const meta: Meta<typeof Form> = {
	title:     'Components/Forms/Form',
	component: Form,
	tags:      ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Form>;

export const LoginForm: Story = {
	render: () => (
		<div className="p-8 max-w-sm">
			<Form>
				<FormField>
					<FormLabel htmlFor="email" required>Email address</FormLabel>
					<FormControl>
						<Input id="email" type="email" placeholder="you@example.com" />
					</FormControl>
				</FormField>

				<FormField>
					<FormLabel htmlFor="password" required>Password</FormLabel>
					<FormControl>
						<Input id="password" type="password" placeholder="••••••••" />
					</FormControl>
					<FormDescription>Must be at least 8 characters.</FormDescription>
				</FormField>

				<Button type="submit" className="w-full">Sign in</Button>
			</Form>
		</div>
	),
};

export const ProfileForm: Story = {
	render: () => (
		<div className="p-8 max-w-lg">
			<Form>
				<FormSection title="Personal information" description="Update your name and contact details.">
					<FormField>
						<FormLabel htmlFor="first-name" required>First name</FormLabel>
						<FormControl>
							<Input id="first-name" placeholder="Jane" />
						</FormControl>
					</FormField>

					<FormField>
						<FormLabel htmlFor="last-name" required>Last name</FormLabel>
						<FormControl>
							<Input id="last-name" placeholder="Smith" />
						</FormControl>
					</FormField>

					<FormField>
						<FormLabel htmlFor="bio">Bio</FormLabel>
						<FormControl>
							<Input id="bio" placeholder="Tell us a little about yourself" />
						</FormControl>
						<FormDescription>This will appear on your public profile.</FormDescription>
					</FormField>
				</FormSection>

				<FormSection title="Account settings" description="Manage your login credentials.">
					<FormField>
						<FormLabel htmlFor="profile-email" required>Email address</FormLabel>
						<FormControl>
							<Input id="profile-email" type="email" placeholder="you@example.com" />
						</FormControl>
					</FormField>

					<FormField>
						<FormLabel htmlFor="new-password">New password</FormLabel>
						<FormControl>
							<Input id="new-password" type="password" placeholder="Leave blank to keep current" />
						</FormControl>
					</FormField>
				</FormSection>

				<div className="flex justify-end gap-3">
					<Button variant="secondary" type="button">Cancel</Button>
					<Button type="submit">Save changes</Button>
				</div>
			</Form>
		</div>
	),
};

export const FieldWithError: Story = {
	render: () => (
		<div className="p-8 max-w-sm">
			<Form>
				<FormField>
					<FormLabel htmlFor="error-email" required>Email address</FormLabel>
					<FormControl>
						<Input
							id="error-email"
							type="email"
							value="not-an-email"
							error="Enter a valid email address."
							aria-describedby="error-email-msg"
						/>
					</FormControl>
					<FormMessage id="error-email-msg">Enter a valid email address.</FormMessage>
				</FormField>
			</Form>
		</div>
	),
};

export const FieldWithHint: Story = {
	render: () => (
		<div className="p-8 max-w-sm">
			<Form>
				<FormField>
					<FormLabel htmlFor="username">Username</FormLabel>
					<FormControl>
						<Input id="username" placeholder="cool_username" />
					</FormControl>
					<FormDescription>Only letters, numbers, and underscores. 3–20 characters.</FormDescription>
				</FormField>
			</Form>
		</div>
	),
};
