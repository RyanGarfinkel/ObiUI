import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Examples',
	description: 'Real-world UI patterns built with DaFink UI components — forms, dashboards, data tables, and more. Copy any example directly into your project.',
};

const ExamplesLayout = ({ children }: { children: React.ReactNode }) =>
{
	return <>{children}</>;
};

export default ExamplesLayout;
