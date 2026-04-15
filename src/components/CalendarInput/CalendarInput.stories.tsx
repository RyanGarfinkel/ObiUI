import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import CalendarInput from './CalendarInput';

const meta: Meta<typeof CalendarInput> = {
	title:     'Components/Inputs/CalendarInput',
	component: CalendarInput,
	tags:      ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CalendarInput>;

export const Default: Story = {
	args: {
		placeholder: 'Select a date',
	},
};

export const WithValue: Story = {
	args: {
		value: new Date(2026, 3, 13),
	},
};

export const WithLabel: Story = {
	args: {
		label:       'Appointment date',
		placeholder: 'Pick a date',
		hint:        'Choose a date for your appointment.',
	},
};

export const WithError: Story = {
	args: {
		label: 'Start date',
		value: new Date(2026, 3, 13),
		error: 'Start date cannot be in the past.',
	},
};

export const WithMinMax: Story = {
	args: {
		label:   'Booking date',
		minDate: new Date(2026, 3, 10),
		maxDate: new Date(2026, 3, 25),
		hint:    'Only dates between Apr 10 – Apr 25 are available.',
	},
};

export const Disabled: Story = {
	args: {
		label:    'Deadline',
		value:    new Date(2026, 3, 13),
		disabled: true,
	},
};

export const Controlled: Story = {
	render: () =>
	{
		const [date, setDate] = useState<Date | null>(null);
		return (
			<div className="flex flex-col gap-4 p-6 max-w-xs">
				<CalendarInput
					label="Selected date"
					value={date}
					onChange={setDate}
					placeholder="Pick a date"
				/>
				<p className="text-sm text-text-muted">
					{date ? `You selected: ${date.toDateString()}` : 'No date selected'}
				</p>
			</div>
		);
	},
};

export const AllStates: Story = {
	render: () => (
		<div className="flex flex-col gap-6 p-6 max-w-xs">
			<CalendarInput
				label="Default"
				placeholder="Select a date"
			/>
			<CalendarInput
				label="With value"
				value={new Date(2026, 3, 13)}
			/>
			<CalendarInput
				label="With hint"
				placeholder="Select a date"
				hint="Choose a date within the next 30 days."
			/>
			<CalendarInput
				label="Error state"
				value={new Date(2026, 3, 5)}
				error="Date is outside the allowed range."
			/>
			<CalendarInput
				label="Disabled"
				value={new Date(2026, 3, 13)}
				disabled
			/>
		</div>
	),
};
