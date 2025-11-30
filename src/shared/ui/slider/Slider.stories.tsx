import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "./Slider";
import { useState } from "react";
import { SliderTrack } from "./components/SliderTrack";
import { SliderRange } from "./components/SliderRange";
import { SliderThumb } from "./components/SliderThumb";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../tooltip";

const meta: Meta<typeof Slider> = {
	component: Slider,
	tags: ["autodocs"],
	parameters: {
		layout: "centered"
	},
	decorators: [
		(Story) => (
			<div className="w-[300px]">
				<Story />
			</div>
		)
	]
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
	args: {
		defaultValue: [50]
	},
	render: (args) => (
		<Slider {...args}>
			<SliderTrack>
				<SliderRange />
			</SliderTrack>
			<SliderThumb />
		</Slider>
	)
};

export const Vertical: Story = {
	args: {
		defaultValue: [50],
		max: 100,
		step: 1,
		orientation: "vertical"
	},
	decorators: [
		(Story) => (
			<div className="flex h-[300px] items-center justify-center">
				<Story />
			</div>
		)
	],
	render: (args) => (
		<Slider {...args}>
			<SliderTrack>
				<SliderRange />
			</SliderTrack>
			<SliderThumb />
		</Slider>
	)
};

export const WithTooltip: Story = {
	render: (args) => {
		function WithTooltipSlider() {
			const [value, setValue] = useState([50]);

			return (
				<Slider {...args} value={value} onValueChange={setValue}>
					<SliderTrack>
						<SliderRange />
					</SliderTrack>

					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<SliderThumb />
							</TooltipTrigger>
							<TooltipContent>
								<p>{value[0]}</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</Slider>
			);
		}

		return <WithTooltipSlider />;
	}
};

export const WithRange: Story = {
	args: {
		defaultValue: [25, 75],
		step: 1
	},
	render: (args) => (
		<Slider {...args}>
			<SliderTrack>
				<SliderRange />
			</SliderTrack>
			<SliderThumb />
			<SliderThumb />
		</Slider>
	)
};

export const Interactive: Story = {
	render: () => {
		function InteractiveSlider() {
			const [value, setValue] = useState([50]);

			return (
				<div className="flex flex-col gap-4">
					<output className="text-right tabular-nums text-primary-fg">{value[0]}</output>
					<Slider value={value} onValueChange={setValue} max={100} step={1}>
						<SliderTrack>
							<SliderRange />
						</SliderTrack>
						<SliderThumb />
					</Slider>
				</div>
			);
		}

		return <InteractiveSlider />;
	}
};

export const RangeInteractive: Story = {
	render: () => {
		function InteractiveSlider() {
			const [value, setValue] = useState([25, 75]);

			return (
				<div className="flex flex-col gap-4">
					<output className="text-right tabular-nums text-primary-fg">
						{value[0]} – {value[1]}
					</output>
					<Slider value={value} onValueChange={setValue} max={100} step={1}>
						<SliderTrack>
							<SliderRange />
						</SliderTrack>
						<SliderThumb />
						<SliderThumb />
					</Slider>
				</div>
			);
		}

		return <InteractiveSlider />;
	}
};

export const Multiple: Story = {
	args: {
		defaultValue: [25, 50, 75],
		step: 1
	},
	render: (args) => (
		<Slider {...args}>
			<SliderTrack>
				<SliderRange />
			</SliderTrack>
			<SliderThumb />
			<SliderThumb />
			<SliderThumb />
		</Slider>
	)
};
