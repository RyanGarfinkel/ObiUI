'use client';

import { SidebarLink } from '@/src/components/Sidebar/Sidebar';
import { usePathname } from 'next/navigation';

interface DocsSidebarLinkProps
{
	href:       string;
	className?: string;
	children:   React.ReactNode;
}

export const DocsSidebarLink = ({ href, className, children }: DocsSidebarLinkProps) => {
	const pathname = usePathname();
	const isActive = pathname === href;

	return (
		<SidebarLink href={href} isActive={isActive} className={className}>
			{children}
		</SidebarLink>
	);
};
