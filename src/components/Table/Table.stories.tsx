import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from './Table';
import { useState } from 'react';

const meta: Meta<typeof Table> = {
	title:     'Components/Display/Table',
	component: Table,
	tags:      ['autodocs'],
	argTypes:  {
		striped: { control: 'boolean' },
	},
};

export default meta;
type Story = StoryObj<typeof Table>;

const COLUMNS = ['Name', 'Role', 'Status', 'Joined'];

const ROWS = [
	{ name: 'Alice Johnson',  role: 'Engineer',  status: 'Active',    joined: '2022-03-14' },
	{ name: 'Ben Carter',     role: 'Designer',   status: 'Active',    joined: '2021-11-02' },
	{ name: 'Clara Kim',      role: 'Manager',    status: 'On leave',  joined: '2020-07-19' },
	{ name: 'David Osei',     role: 'Engineer',  status: 'Inactive',  joined: '2023-01-05' },
	{ name: 'Eva Martinez',   role: 'Analyst',    status: 'Active',    joined: '2022-09-30' },
];

export const Default: Story = {
	render: () => (
		<Table>
			<TableHead>
				<TableRow header>
					{COLUMNS.map((col) => (
						<TableHeader key={col}>{col}</TableHeader>
					))}
				</TableRow>
			</TableHead>
			<TableBody>
				{ROWS.map((row) => (
					<TableRow key={row.name}>
						<TableCell>{row.name}</TableCell>
						<TableCell>{row.role}</TableCell>
						<TableCell>{row.status}</TableCell>
						<TableCell>{row.joined}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	),
};

export const Striped: Story = {
	render: () => (
		<Table striped>
			<TableHead>
				<TableRow header>
					{COLUMNS.map((col) => (
						<TableHeader key={col}>{col}</TableHeader>
					))}
				</TableRow>
			</TableHead>
			<TableBody>
				{ROWS.map((row) => (
					<TableRow key={row.name}>
						<TableCell>{row.name}</TableCell>
						<TableCell>{row.role}</TableCell>
						<TableCell>{row.status}</TableCell>
						<TableCell>{row.joined}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	),
};

type SortKey = 'name' | 'role' | 'status' | 'joined';
type Direction = 'asc' | 'desc' | null;

function SortableDemo()
{
	const [sortKey, setSortKey] = useState<SortKey | null>(null);
	const [sortDir, setSortDir] = useState<Direction>(null);

	const handleSort = (key: SortKey) =>
	{
		if(sortKey !== key)
		{
			setSortKey(key);
			setSortDir('asc');
			return;
		}

		if(sortDir === 'asc') { setSortDir('desc'); return; }
		if(sortDir === 'desc') { setSortKey(null); setSortDir(null); }
	};

	const sorted = [...ROWS].sort((a, b) =>
	{
		if(!sortKey || !sortDir) return 0;
		return sortDir === 'asc'
			? a[sortKey].localeCompare(b[sortKey])
			: b[sortKey].localeCompare(a[sortKey]);
	});

	const dirFor = (key: SortKey): Direction => sortKey === key ? sortDir : null;

	return (
		<Table>
			<TableHead>
				<TableRow header>
					<TableHeader sortDirection={dirFor('name')}   onSort={() => handleSort('name')}>Name</TableHeader>
					<TableHeader sortDirection={dirFor('role')}   onSort={() => handleSort('role')}>Role</TableHeader>
					<TableHeader sortDirection={dirFor('status')} onSort={() => handleSort('status')}>Status</TableHeader>
					<TableHeader sortDirection={dirFor('joined')} onSort={() => handleSort('joined')}>Joined</TableHeader>
				</TableRow>
			</TableHead>
			<TableBody>
				{sorted.map((row) => (
					<TableRow key={row.name}>
						<TableCell>{row.name}</TableCell>
						<TableCell>{row.role}</TableCell>
						<TableCell>{row.status}</TableCell>
						<TableCell>{row.joined}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}

export const Sortable: Story = {
	render: () => <SortableDemo />,
};

export const SortableAscending: Story = {
	name: 'Sortable — Ascending',
	render: () => (
		<Table>
			<TableHead>
				<TableRow header>
					<TableHeader sortDirection="asc"  onSort={() => {}}>Name</TableHeader>
					<TableHeader sortDirection={null} onSort={() => {}}>Role</TableHeader>
					<TableHeader sortDirection={null} onSort={() => {}}>Status</TableHeader>
					<TableHeader sortDirection={null} onSort={() => {}}>Joined</TableHeader>
				</TableRow>
			</TableHead>
			<TableBody>
				{ROWS.map((row) => (
					<TableRow key={row.name}>
						<TableCell>{row.name}</TableCell>
						<TableCell>{row.role}</TableCell>
						<TableCell>{row.status}</TableCell>
						<TableCell>{row.joined}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	),
};

export const SortableDescending: Story = {
	name: 'Sortable — Descending',
	render: () => (
		<Table>
			<TableHead>
				<TableRow header>
					<TableHeader sortDirection="desc" onSort={() => {}}>Name</TableHeader>
					<TableHeader sortDirection={null} onSort={() => {}}>Role</TableHeader>
					<TableHeader sortDirection={null} onSort={() => {}}>Status</TableHeader>
					<TableHeader sortDirection={null} onSort={() => {}}>Joined</TableHeader>
				</TableRow>
			</TableHead>
			<TableBody>
				{[...ROWS].reverse().map((row) => (
					<TableRow key={row.name}>
						<TableCell>{row.name}</TableCell>
						<TableCell>{row.role}</TableCell>
						<TableCell>{row.status}</TableCell>
						<TableCell>{row.joined}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	),
};

export const StripedAndSortable: Story = {
	name: 'Striped + Sortable',
	render: () => (
		<Table striped>
			<TableHead>
				<TableRow header>
					<TableHeader sortDirection="asc"  onSort={() => {}}>Name</TableHeader>
					<TableHeader sortDirection={null} onSort={() => {}}>Role</TableHeader>
					<TableHeader>Status</TableHeader>
					<TableHeader>Joined</TableHeader>
				</TableRow>
			</TableHead>
			<TableBody>
				{ROWS.map((row) => (
					<TableRow key={row.name}>
						<TableCell>{row.name}</TableCell>
						<TableCell>{row.role}</TableCell>
						<TableCell>{row.status}</TableCell>
						<TableCell>{row.joined}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	),
};
