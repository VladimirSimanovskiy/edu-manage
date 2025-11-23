import type { Meta, StoryObj } from "@storybook/react";
import { useMemo } from "react";
import { CalendarDayButton, CalendarDayButtonProps, ModifiersRdp } from "./CalendarDayButton";
import { CalendarDay as CalendarDayRdp } from "react-day-picker";

const meta = {
	component: CalendarDayButton,
	tags: ["autodocs"],
	parameters: {
		layout: "centered"
	}
} satisfies Meta<typeof CalendarDayButton>;

export default meta;

type CalendarDayButtonStoryProps = Omit<CalendarDayButtonProps, "modifiers"> & ModifiersRdp;

function CalendarDayButtonStory({
	selected,
	range_start,
	range_end,
	range_middle,
	today,
	disabled,
	outside,
	focused,
	...props
}: CalendarDayButtonStoryProps) {
	const modifiers = useMemo(() => {
		return {
			selected: !!selected,
			range_start: !!range_start,
			range_end: !!range_end,
			range_middle: !!range_middle,
			today: !!today,
			disabled: !!disabled,
			outside: !!outside,
			focused: !!focused
		};
	}, [selected, range_start, range_end, range_middle, today, disabled, outside, focused]);

	return <CalendarDayButton {...props} modifiers={modifiers} />;
}

type Story = StoryObj<typeof CalendarDayButtonStory>;

export const Default: Story = {
	args: {
		day: new CalendarDayRdp(new Date(), new Date()),
		children: "15"
	},
	argTypes: {
		selected: {
			control: { type: "boolean" }
		},
		range_start: {
			control: { type: "boolean" }
		},
		range_end: {
			control: { type: "boolean" }
		},
		range_middle: {
			control: { type: "boolean" }
		},
		today: {
			control: { type: "boolean" }
		},
		disabled: {
			control: { type: "boolean" }
		},
		outside: {
			control: { type: "boolean" }
		},
		focused: {
			control: { type: "boolean" }
		}
	},
	render: CalendarDayButtonStory
};

const selectedTypes: Record<string, ModifiersRdp> = {
	default: {},
	selected: { selected: true },
	range_start: { selected: true, range_start: true },
	range_end: { selected: true, range_end: true },
	range_middle: { selected: true, range_middle: true },
	range_start_end: { selected: true, range_start: true, range_end: true }
};
const props: ModifiersRdp[] = [
	{ today: true },
	{ disabled: true },
	{ outside: true },
	{ disabled: true, outside: true },
	{ today: true, disabled: true },
	{ today: true, outside: true },
	{ today: true, disabled: true, outside: true }
] as const;

const labelKey = "label";
const keys = [labelKey, ...Object.keys(selectedTypes)];
const viewModel = {
	th: keys,
	rows: props.map((prop, rowIdx) => {
		return keys.map((key, colIdx) => {
			if (key == "label") {
				return {
					children: Object.keys(prop).join(", ")
				};
			}

			const modifiers = {
				...prop,
				...selectedTypes[key]
			};

			const number = rowIdx * 10 + colIdx;
			const date = new Date(2025, 0, number);
			const day = new CalendarDayRdp(date, date);

			return {
				modifiers: modifiers,
				children: day.date.getDate().toString(),
				day: day
			};
		});
	})
};

export const Showcase: Story = {
	render: () => {
		const day = new CalendarDayRdp(new Date(), new Date());

		return (
			<div className="flex gap-4">
				<table className="w-full border-collapse">
					<thead>
						<tr className="">
							{viewModel.th.map((value, idx) => {
								if (idx === 0) {
									return (
										<th
											key={idx}
											className="whitespace-nowrap border-b border-r px-2 text-right font-mono text-xs font-semibold text-muted-foreground"
										></th>
									);
								}

								return (
									<th
										key={value}
										className="w-9 shrink-0 items-center border-b p-0 text-center text-xs font-bold text-muted-foreground"
										style={{
											writingMode: "vertical-lr",
											textOrientation: "mixed",
											height: "100px",
											minWidth: "24px"
										}}
									>
										{value}
									</th>
								);
							})}
						</tr>
					</thead>
					<tbody>
						{viewModel.rows.map((row, rowIdx) => (
							<tr key={rowIdx} className="">
								{row.map((props, colIdx) => {
									if (colIdx === 0) {
										return (
											<td
												key={colIdx}
												className="border-b border-r px-2 text-right font-mono text-xs font-semibold text-muted-foreground"
											>
												{props.children}
											</td>
										);
									}
									return (
										<td key={colIdx} className="b-0 p-0 text-center">
											<CalendarDayButton day={day} modifiers={props.modifiers!}>
												{props.children}
											</CalendarDayButton>
										</td>
									);
								})}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	},
	parameters: {
		controls: {
			disable: true
		}
	}
};
