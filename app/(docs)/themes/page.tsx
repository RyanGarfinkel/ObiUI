import { CodeBlock } from '@/src/components/CodeBlock/CodeBlock';
import { themes } from '@/src/themes';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Themes',
	description: 'Switch between built-in DaFink UI themes — Zinc, Ocean, Ember, Forest, Noir, and Plum — or create your own by overriding CSS custom property tokens.',
};

const THEME_DESCRIPTIONS: Record<string, string> = {
	default: 'Clean and minimal. Pure white surfaces with jet-black brand — a neutral premium look that works in any context.',
	ocean:   'Deep sky blue brand over cool blue-tinted surfaces. Dark mode drops into a true deep navy with precise elevation steps.',
	ember:   'Warm orange brand with amber-tinted surfaces. Dark mode goes to a near-black with deep warm undertones — rich without being aggressive.',
	forest:  'Fresh emerald brand over subtly green-tinted surfaces. Dark mode is a true deep forest — near-black with green undertones and clear hierarchy.',
	noir:    'Cool slate surfaces with a deep charcoal brand. Quieter than Zinc — every surface has a blue undertone that reads refined and editorial.',
	plum:    'Rich violet brand over barely-tinted surfaces. Dark mode is deep violet-black — luxurious, design-forward, and high contrast.',
};

const THEME_SHAPE_SNIPPET = `import type { Theme } from '@/src/themes/types';

export const myTheme: Theme = {
  name:   'my-theme',
  label:  'My Theme',
  accent: '#0ea5e9', // swatch hex shown in the picker

  light: {
    '--color-brand':        '#0284c7',
    '--color-brand-hover':  '#0369a1',
    '--color-brand-active': '#075985',
    '--color-brand-ring':   '#0284c7',
    '--color-brand-fg':     '#ffffff',

    // surface, text, input tokens ...
  },

  dark: {
    '--color-brand':        '#38bdf8',
    '--color-brand-hover':  '#7dd3fc',
    '--color-brand-active': '#bae6fd',
    '--color-brand-ring':   '#38bdf8',
    '--color-brand-fg':     '#0c4a6e',

    // surface, text, input tokens ...
  },
};`;

const APPLY_SNIPPET = `// Wrap your preview area with the theme's token map
import { oceanTheme } from '@/src/themes/ocean';

<div style={oceanTheme.light as React.CSSProperties}>
  <YourApp />
</div>`;

const InlineCode = ({ children }: { children: string }) =>
{
	return (
		<code className='font-mono text-sm text-text bg-surface-active rounded px-1.5 py-0.5'>
			{children}
		</code>
	);
};

const ThemesPage = () =>
{
	return (
		<div className='flex flex-col gap-10'>

			{/* Header */}
			<div className='flex flex-col gap-2'>
				<h1 className='text-3xl font-semibold tracking-tight text-text'>Themes</h1>
				<p className='text-base text-text-muted leading-relaxed'>
					DaFink UI is fully themeable via CSS custom properties. Swapping a theme
					changes the entire visual identity of your app without touching a single
					component.
				</p>
			</div>

			{/* What themes are */}
			<div className='flex flex-col gap-4'>
				<h2 className='text-xl font-semibold text-text'>How themes work</h2>
				<p className='text-sm text-text-muted leading-relaxed'>
					Every component in DaFink UI is styled through token classes like{' '}
					<InlineCode>bg-brand</InlineCode> and <InlineCode>text-text-muted</InlineCode>.
					These resolve to CSS custom properties defined in{' '}
					<InlineCode>globals.css</InlineCode>. A theme is simply a map of those
					variable names to new values — no component changes needed.
				</p>
				<p className='text-sm text-text-muted leading-relaxed'>
					Apply a theme by injecting its token map onto a wrapper element via the{' '}
					<InlineCode>style</InlineCode> prop. Because CSS custom properties cascade,
					every component inside that wrapper automatically inherits the new values.
				</p>
			</div>

			{/* How to apply */}
			<div className='flex flex-col gap-4'>
				<h2 className='text-xl font-semibold text-text'>Applying a theme</h2>
				<p className='text-sm text-text-muted leading-relaxed'>
					Pass the theme&apos;s <InlineCode>light</InlineCode> or{' '}
					<InlineCode>dark</InlineCode> token map as an inline style on any wrapper
					element. All DaFink UI components beneath it will re-theme automatically.
				</p>
				<CodeBlock code={APPLY_SNIPPET} />
				<p className='text-sm text-text-muted leading-relaxed'>
					The docs site uses this pattern in the <InlineCode>DesignSystemPicker</InlineCode>{' '}
					component — it maintains the active theme in state and injects the token
					map onto a <InlineCode>div</InlineCode> that wraps every component preview.
				</p>
			</div>

			{/* Pre-built themes */}
			<div className='flex flex-col gap-5'>
				<div className='flex flex-col gap-1'>
					<h2 className='text-xl font-semibold text-text'>Pre-built themes</h2>
					<p className='text-sm text-text-muted'>
						Six themes ship with DaFink UI. Import them from{' '}
						<InlineCode>@/src/themes</InlineCode>.
					</p>
				</div>

				<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
					{themes.map((theme) => (
						<div
							key={theme.name}
							className='flex flex-col gap-3 rounded-lg border border-surface-border bg-surface-hover/40 p-5 transition-colors duration-[var(--duration-fast)] hover:bg-surface-hover'
						>
							<div className='flex items-center gap-3'>
								<span
									className='h-8 w-8 rounded-full border border-surface-border shrink-0'
									style={{ backgroundColor: theme.accent }}
									aria-hidden='true'
								/>
								<div className='flex flex-col gap-0.5'>
									<span className='text-sm font-semibold text-text'>{theme.label}</span>
									<InlineCode>{theme.name}</InlineCode>
								</div>
							</div>
							<p className='text-sm text-text-muted leading-relaxed'>
								{THEME_DESCRIPTIONS[theme.name] ?? ''}
							</p>
						</div>
					))}
				</div>
			</div>

			{/* Custom themes */}
			<div className='flex flex-col gap-4'>
				<h2 className='text-xl font-semibold text-text'>Creating a custom theme</h2>
				<p className='text-sm text-text-muted leading-relaxed'>
					A theme is a plain TypeScript object that satisfies the{' '}
					<InlineCode>Theme</InlineCode> interface from{' '}
					<InlineCode>@/src/themes/types</InlineCode>. You only need to override the
					tokens you want to change — start from a copy of{' '}
					<InlineCode>defaultTheme</InlineCode> and adjust the brand and surface
					palette.
				</p>
				<CodeBlock code={THEME_SHAPE_SNIPPET} />
				<p className='text-sm text-text-muted leading-relaxed'>
					Define both <InlineCode>light</InlineCode> and <InlineCode>dark</InlineCode>{' '}
					token maps. Do not rely on cascade fallbacks — if a token is not in the
					map it will fall back to the global default, which may not match your
					intended palette.
				</p>
			</div>

			{/* Installation / CSS variable approach */}
			<div className='flex flex-col gap-4 border-t border-surface-border pt-8'>
				<h2 className='text-xl font-semibold text-text'>CSS variable approach</h2>
				<p className='text-sm text-text-muted leading-relaxed'>
					The global token defaults live in <InlineCode>app/globals.css</InlineCode>{' '}
					under the <InlineCode>@theme</InlineCode> block. These define the baseline
					palette used by all components when no theme wrapper is present. Dark mode
					overrides sit immediately below in the <InlineCode>.dark</InlineCode>{' '}
					selector.
				</p>
				<p className='text-sm text-text-muted leading-relaxed'>
					These values are generated, not hand-written. The source of truth is the
					set of JSON files in <InlineCode>tokens/</InlineCode> (one per theme, per
					mode — e.g. <InlineCode>tokens/zinc.light.json</InlineCode>), plus{' '}
					<InlineCode>tokens/motion.json</InlineCode>. Running{' '}
					<InlineCode>npm run tokens</InlineCode> compiles those files into{' '}
					<InlineCode>src/tokens/colors.ts</InlineCode> and the CSS custom properties
					in <InlineCode>globals.css</InlineCode>. Edit the JSON, then re-run the
					script — do not edit the generated files directly.
				</p>
				<p className='text-sm text-text-muted leading-relaxed'>
					Themes do not need to redefine every token — only the ones that differ from
					the defaults. The recommended starting point is to override the five brand
					tokens (<InlineCode>--color-brand</InlineCode>,{' '}
					<InlineCode>--color-brand-hover</InlineCode>,{' '}
					<InlineCode>--color-brand-active</InlineCode>,{' '}
					<InlineCode>--color-brand-ring</InlineCode>,{' '}
					<InlineCode>--color-brand-fg</InlineCode>) and adjust the surface palette
					if your brand color is strongly chromatic.
				</p>
			</div>

		</div>
	);
};

export default ThemesPage;
