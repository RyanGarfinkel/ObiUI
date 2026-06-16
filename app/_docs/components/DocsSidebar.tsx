import { Sidebar, SidebarSection } from '@/src/components/Sidebar/Sidebar';
import { DocsSidebarLink } from '@/app/_docs/components/DocsSidebarLink';
import { CATEGORIES } from '@/app/_docs/registry/categories';
import { registry } from '@/app/_docs/registry';

export const DocsSidebar = () => {
	const byCategory = CATEGORIES.reduce<
		Record<string, typeof registry>
	>((acc, cat) =>
	{
		const entries = registry.filter((c) => c.category === cat);
		if(entries.length > 0) acc[cat] = entries;
		return acc;
	}, {});

	return (
		<Sidebar
			width='w-56'
			height='h-[calc(100vh-3.5rem)]'
			className='hidden md:block fixed left-0 top-14'
		>
			<nav className='flex flex-col gap-1'>
				<DocsSidebarLink href='/'>Home</DocsSidebarLink>
				<DocsSidebarLink href='/installation'>Installation</DocsSidebarLink>
				<DocsSidebarLink href='/themes'>Themes</DocsSidebarLink>
				<DocsSidebarLink href='/styles'>Styles</DocsSidebarLink>
				<DocsSidebarLink href='/typography'>Typography</DocsSidebarLink>
				<DocsSidebarLink href='/components'>All Components</DocsSidebarLink>
				<DocsSidebarLink href='/examples'>Examples</DocsSidebarLink>
				<DocsSidebarLink href='/mcp'>MCP Server</DocsSidebarLink>
				<DocsSidebarLink href='/skill'>Design Skill</DocsSidebarLink>
			</nav>

			{CATEGORIES.filter((cat) => byCategory[cat]).map((category) => (
				<SidebarSection key={category} label={category}>
					{byCategory[category].map((entry) => (
						<DocsSidebarLink
							key={entry.slug}
							href={`/components/${entry.slug}`}
						>
							{entry.name}
						</DocsSidebarLink>
					))}
				</SidebarSection>
			))}
		</Sidebar>
	);
};
