import React from 'react';
import type { Preview, Decorator } from '@storybook/nextjs-vite';
import { withThemeByClassName } from '@storybook/addon-themes';
import '../app/globals.css';

const withBackground: Decorator = (Story) => (
	<div className="min-h-screen bg-white dark:bg-zinc-950 p-8 transition-colors duration-200">
		<Story />
	</div>
);

const preview: Preview = {
	decorators: [
		withThemeByClassName({
			themes: {
				light: '',
				dark:  'dark',
			},
			defaultTheme: 'light',
		}),
		withBackground,
	],
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date:  /Date$/i,
			},
		},
		a11y: {
			test: 'todo',
		},
	},
};

export default preview;
