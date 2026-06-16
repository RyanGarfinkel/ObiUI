'use client';
import Drawer, { DrawerHeader, DrawerTitle, DrawerContent, DrawerClose } from '@/src/components/Drawer/Drawer';
import { DocsSidebarLink } from '@/app/_docs/components/DocsSidebarLink';
import { SidebarSection } from '@/src/components/Sidebar/Sidebar';
import { CATEGORIES } from '@/app/_docs/registry/categories';
import { registry } from '@/app/_docs/registry';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const MobileNav = () =>
{
	const [open, setOpen] = useState(false);

	const pathname = usePathname();

	// Close the drawer after any navigation
	useEffect(() =>
	{
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setOpen(false);
	}, [pathname]);

	const byCategory = CATEGORIES.reduce<Record<string, typeof registry>>((acc, cat) =>
	{
		const entries = registry.filter((c) => c.category === cat);
		if(entries.length > 0) acc[cat] = entries;
		return acc;
	}, {});

	return (
		<div className='md:hidden'>
			<button
				type='button'
				onClick={() => setOpen(true)}
				aria-label='Open navigation'
				aria-expanded={open}
				className='flex h-11 w-11 items-center justify-center rounded-md text-text-muted transition-colors duration-[var(--duration-fast)] hover:bg-surface-hover hover:text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-ring'
			>
				<svg
					width='18'
					height='18'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
					aria-hidden='true'
				>
					<path d='M4 6h16M4 12h16M4 18h16' />
				</svg>
			</button>

			<Drawer open={open} onOpenChange={setOpen} side='left'>
				<DrawerHeader className='px-4'>
					<DrawerTitle>Navigation</DrawerTitle>
				</DrawerHeader>
				<DrawerClose />
				<DrawerContent className='px-3'>
					<div className='flex flex-col gap-6 pb-6'>
						<nav className='flex flex-col gap-1'>
							<DocsSidebarLink href='/' className='py-3'>Home</DocsSidebarLink>
							<DocsSidebarLink href='/installation' className='py-3'>Installation</DocsSidebarLink>
							<DocsSidebarLink href='/themes' className='py-3'>Themes</DocsSidebarLink>
							<DocsSidebarLink href='/styles' className='py-3'>Styles</DocsSidebarLink>
							<DocsSidebarLink href='/typography' className='py-3'>Typography</DocsSidebarLink>
							<DocsSidebarLink href='/components' className='py-3'>All Components</DocsSidebarLink>
							<DocsSidebarLink href='/examples' className='py-3'>Examples</DocsSidebarLink>
							<DocsSidebarLink href='/mcp' className='py-3'>MCP Server</DocsSidebarLink>
							<DocsSidebarLink href='/skill' className='py-3'>Design Skill</DocsSidebarLink>
						</nav>

						{CATEGORIES.filter((cat) => byCategory[cat]).map((category) => (
							<SidebarSection key={category} label={category}>
								{byCategory[category].map((entry) => (
									<DocsSidebarLink
										key={entry.slug}
										href={`/components/${entry.slug}`}
										className='py-3'
									>
										{entry.name}
									</DocsSidebarLink>
								))}
							</SidebarSection>
						))}
					</div>
				</DrawerContent>
			</Drawer>
		</div>
	);
};
