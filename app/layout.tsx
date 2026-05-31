import { Geist, Geist_Mono } from 'next/font/google';
import { cookies } from 'next/headers';
import type { Metadata } from 'next';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const DESCRIPTION = 'A copy-paste React component library. Install only the components you need, own the source code, and never fight the library.';
const SITE_URL    = 'https://obi-ui.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s | Obi UI',
    default: 'Obi UI — Copy-paste React components',
  },
  description: DESCRIPTION,
  applicationName: 'Obi UI',
  keywords: [
    'react', 'component library', 'design system', 'tailwind', 'tailwind v4',
    'copy-paste', 'ui components', 'accessible', 'next.js', 'open source',
    'headless', 'radix', 'shadcn', 'react components', 'typescript',
    'wcag', 'keyboard navigation', 'dark mode', 'theming', 'css variables',
  ],
  authors: [{ name: 'Obi UI', url: 'https://github.com/RyanGarfinkel/ObiUI' }],
  openGraph: {
    title: 'Obi UI — Copy-paste React components',
    description: DESCRIPTION,
    type: 'website',
    url: SITE_URL,
    siteName: 'Obi UI',
  },
  twitter: {
    card: 'summary',
    title: 'Obi UI — Copy-paste React components',
    description: DESCRIPTION,
    site: '@obiui',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const RootLayout = async (
  {
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>
) => {
  const cookieStore = await cookies();
  const theme  = cookieStore.get('theme')?.value;
  const isDark = theme === 'dark';

  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={[
        geistSans.variable,
        geistMono.variable,
        'h-full antialiased',
        isDark ? 'dark' : '',
      ].join(' ').trim()}
    >
      <head />
      <body className='min-h-full bg-surface text-text'>{children}</body>
    </html>
  );
};

export default RootLayout;
