import { Card, CardHeader, CardContent } from '@/src/components/Card/Card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Styles',
	description: 'The Style axis — surface treatments like Minimalism, Neumorphism, and Neobrutalism — and how each composes with any color palette.',
};

interface StyleEntry
{
	name:        string;
	tagline:     string;
	traits:      string;
	a11y:        string;
	a11yTone:    'strong' | 'caution' | 'note';
	whenToUse:   string;
}

const STYLES: StyleEntry[] = [
	{
		name:      'Minimalism',
		tagline:   'Restraint as the default — clarity over decoration.',
		traits:    'Restrained radius, hairline borders, little to no shadow, generous whitespace, neutral surfaces. The closest fit to a clean, unopinionated default.',
		a11y:      'Strong. High contrast and clear separation come naturally, with few effects to compromise legibility.',
		a11yTone:  'strong',
		whenToUse: 'Content-heavy apps, enterprise tools, reading experiences — anything that prioritizes clarity and longevity.',
	},
	{
		name:      'Neumorphism',
		tagline:   'Extruded and inset shapes pressed out of the background.',
		traits:    'The surface is locked to a neutral gray so dual shadows (white top-left, dark bottom-right) are visible. Depth comes entirely from shadow, with no border and a medium-to-large radius. Form fields use an inset version of the shadow to feel sunken.',
		a11y:      'The weakest style for accessibility. Borders vanish and contrast between elements is low. Treat it as opt-in and use it sparingly — toggles, sliders, and cards only — while keeping the rest of the UI flat.',
		a11yTone:  'caution',
		whenToUse: 'Sparingly, for tactile accents on individual controls. Do not build a whole interface in Neumorph.',
	},
	{
		name:      'Neobrutalism',
		tagline:   'Raw, bold, and unmistakably loud.',
		traits:    'Radius 0, thick solid borders (2–4px), and a hard offset shadow (e.g. 4px 4px 0 with no blur). High contrast, with bold or monospaced type.',
		a11y:      'Generally strong. High contrast and visible, heavy borders make boundaries and focus easy to perceive.',
		a11yTone:  'strong',
		whenToUse: 'Brands that want to stand out — portfolios, editorial sites, developer tools, and marketing pages.',
	},
];

const TONE_LABEL: Record<StyleEntry['a11yTone'], string> = {
	strong:  'Accessibility — strong',
	caution: 'Accessibility — caution',
	note:    'Accessibility — note',
};

const TONE_DOT: Record<StyleEntry['a11yTone'], string> = {
	strong:  'bg-success',
	caution: 'bg-warning',
	note:    'bg-text-muted',
};

const InlineCode = ({ children }: { children: string }) =>
{
	return (
		<code className='font-mono text-sm text-text bg-surface-active rounded px-1.5 py-0.5'>
			{children}
		</code>
	);
};

const TraitRow = ({ label, children }: { label: string; children: React.ReactNode }) =>
{
	return (
		<div className='flex flex-col gap-1'>
			<span className='text-xs font-semibold uppercase tracking-wide text-text-muted'>{label}</span>
			<p className='text-sm text-text-muted leading-relaxed'>{children}</p>
		</div>
	);
};

const StylesPage = () =>
{
	return (
		<div className='flex flex-col gap-10'>

			{/* Header */}
			<div className='flex flex-col gap-2'>
				<h1 className='text-3xl font-semibold tracking-tight text-text'>Styles</h1>
				<p className='text-base text-text-muted leading-relaxed'>
					A style is the surface treatment of your UI — the radius, border, shadow,
					blur, and transparency that give components their look and feel. It is a new
					axis in DaFink UI, chosen from a Style dropdown and applied across the whole app.
				</p>
			</div>

			{/* Mental model */}
			<div className='flex flex-col gap-4'>
				<h2 className='text-xl font-semibold text-text'>Two independent axes</h2>
				<p className='text-sm text-text-muted leading-relaxed'>
					Every DaFink UI surface is described by two independent choices:
				</p>
				<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
					<div className='flex flex-col gap-2 rounded-lg border border-surface-border bg-surface-hover/40 p-5'>
						<span className='text-sm font-semibold text-text'>Style</span>
						<p className='text-sm text-text-muted leading-relaxed'>
							The surface treatment — radius, shadow, blur, and border. Picked from
							the new Style dropdown.
						</p>
					</div>
					<div className='flex flex-col gap-2 rounded-lg border border-surface-border bg-surface-hover/40 p-5'>
						<span className='text-sm font-semibold text-text'>Palette</span>
						<p className='text-sm text-text-muted leading-relaxed'>
							The color — brand, surface, and text tokens. Picked from a{' '}
							<InlineCode>Theme</InlineCode>.
						</p>
					</div>
				</div>
				<p className='text-sm text-text-muted leading-relaxed'>
					The two compose freely: any style works with any palette. Switching from the
					Ocean palette to Ember does not change your chosen style. Keeping these axes
					separate is what lets a single component library cover everything from a
					calm enterprise tool to a loud marketing site.
				</p>
			</div>

			{/* The styles */}
			<div className='flex flex-col gap-5'>
				<div className='flex flex-col gap-1'>
					<h2 className='text-xl font-semibold text-text'>The styles</h2>
					<p className='text-sm text-text-muted'>
						Three surface styles ship with the Style axis. Each composes with any palette.
					</p>
				</div>

				<div className='flex flex-col gap-4'>
					{STYLES.map((style) => (
						<Card key={style.name} variant='outline'>
							<CardHeader>
								<div className='flex flex-col gap-1'>
									<h3 className='text-lg font-semibold text-text'>{style.name}</h3>
									<p className='text-sm text-text-muted leading-relaxed'>{style.tagline}</p>
								</div>
							</CardHeader>
							<CardContent>
								<div className='flex flex-col gap-4'>
									<TraitRow label='Visual traits'>{style.traits}</TraitRow>
									<div className='flex flex-col gap-1'>
										<span className='flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-text-muted'>
											<span
												className={`h-2 w-2 rounded-full shrink-0 ${TONE_DOT[style.a11yTone]}`}
												aria-hidden='true'
											/>
											{TONE_LABEL[style.a11yTone]}
										</span>
										<p className='text-sm text-text-muted leading-relaxed'>{style.a11y}</p>
									</div>
									<TraitRow label='When to use it'>{style.whenToUse}</TraitRow>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>


</div>
	);
};

export default StylesPage;
