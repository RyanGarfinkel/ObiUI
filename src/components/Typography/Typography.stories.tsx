import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Typography from './Typography';

const meta: Meta<typeof Typography> = {
	title:     'Components/Display/Typography',
	component: Typography,
	tags:      ['autodocs'],
	argTypes:  {
		variant: {
			control:  'select',
			options:  ['h1', 'h2', 'h3', 'h4', 'p', 'lead', 'muted', 'small', 'code', 'blockquote'],
		},
	},
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Overview: Story = {
	render: () => (
		<div className="flex flex-col gap-6 p-8">
			<Typography variant="h1">The quick brown fox</Typography>
			<Typography variant="h2">The quick brown fox</Typography>
			<Typography variant="h3">The quick brown fox</Typography>
			<Typography variant="h4">The quick brown fox</Typography>
			<Typography variant="p">
				The quick brown fox jumps over the lazy dog. Typography is the art and technique of arranging type to make written language legible and appealing.
			</Typography>
			<Typography variant="lead">
				A leading paragraph introduces a section with slightly larger, softer text to ease the reader in.
			</Typography>
			<Typography variant="muted">
				Muted text is used for secondary information, captions, and helper copy.
			</Typography>
			<Typography variant="small">Small text for fine print, labels, and metadata.</Typography>
			<Typography variant="code">const greeting = &quot;Hello, world&quot;;</Typography>
			<Typography variant="blockquote">
				Design is not just what it looks like and feels like. Design is how it works.
			</Typography>
		</div>
	),
};

export const Playground: Story = {
	args: {
		variant:  'p',
		children: 'The quick brown fox jumps over the lazy dog.',
	},
};
