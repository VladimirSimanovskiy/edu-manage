import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup } from "./RadioGroup";
import { RadioGroupItem } from "./components/RadioGroupItem";
import { Label } from "../label/Label";
import { Description } from "../description";

const meta: Meta<typeof RadioGroup> = {
	component: RadioGroup,
	tags: ["autodocs"],
	parameters: {
		layout: "centered"
	},
	argTypes: {
		disabled: {
			control: "boolean"
		}
	}
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
	render: (args) => (
		<RadioGroup defaultValue="option-1" {...args}>
			<div className="flex items-center gap-3">
				<RadioGroupItem value="option-1" id="option-1" />
				<Label htmlFor="option-1">Опция 1</Label>
			</div>
			<div className="flex items-center gap-3">
				<RadioGroupItem value="option-2" id="option-2" />
				<Label htmlFor="option-2">Опция 2</Label>
			</div>
			<div className="flex items-center gap-3">
				<RadioGroupItem value="option-3" id="option-3" />
				<Label htmlFor="option-3">Опция 3</Label>
			</div>
		</RadioGroup>
	)
};

export const DisabledSingleItem: Story = {
	render: (args) => (
		<RadioGroup defaultValue="option-1" {...args}>
			<div className="flex items-center gap-3">
				<RadioGroupItem value="option-1" id="single-1" />
				<Label htmlFor="single-1">Опция 1</Label>
			</div>
			<div className="flex items-center gap-3">
				<RadioGroupItem value="option-2" id="single-2" disabled />
				<Label htmlFor="single-2">Опция 2 (отключена)</Label>
			</div>
			<div className="flex items-center gap-3">
				<RadioGroupItem value="option-3" id="single-3" />
				<Label htmlFor="single-3">Опция 3</Label>
			</div>
		</RadioGroup>
	)
};

export const WithSublabel: Story = {
	render: (args) => (
		<RadioGroup defaultValue="option-1" {...args}>
			<div className="flex items-center gap-3">
				<RadioGroupItem value="option-1" id="option-1" />
				<div className="flex flex-row gap-1">
					<Label htmlFor="option-1" className="font-normal">
						Опция 1
					</Label>
					<Label htmlFor="option-1" className="text-xs font-normal text-muted">
						(sublabel)
					</Label>
				</div>
			</div>
			<div className="flex items-center gap-3">
				<RadioGroupItem value="option-2" id="option-2" />
				<div className="flex flex-row gap-1">
					<Label htmlFor="option-2" className="font-normal">
						Опция 2
					</Label>
					<Label htmlFor="option-2" className="text-xs font-normal text-muted">
						(sublabel)
					</Label>
				</div>
			</div>
			<div className="flex items-center gap-3">
				<RadioGroupItem value="option-3" id="option-3" />
				<div className="flex flex-row gap-1">
					<Label htmlFor="option-3" className="font-normal">
						Опция 3
					</Label>
					<Label htmlFor="option-3" className="text-xs font-normal text-muted">
						(sublabel)
					</Label>
				</div>
			</div>
		</RadioGroup>
	)
};

export const WithDescriptions: Story = {
	render: (args) => (
		<RadioGroup defaultValue="option-1" {...args}>
			<div className="flex gap-3">
				<RadioGroupItem value="option-1" id="option-1" />
				<div className="flex flex-col gap-1">
					<div className="flex flex-row gap-1">
						<Label htmlFor="option-1" className="font-normal">
							Опция 1
						</Label>
						<Label htmlFor="option-1" className="text-xs font-normal text-muted">
							(sublabel)
						</Label>
					</div>
					<p className="text-xs text-muted">This is a radio description</p>
				</div>
			</div>

			<div className="flex gap-3">
				<RadioGroupItem value="option-2" id="option-2" />
				<div className="flex flex-col gap-1">
					<div className="flex flex-row gap-1">
						<Label htmlFor="option-2" className="font-normal">
							Опция 2
						</Label>
						<Label htmlFor="option-2" className="text-xs font-normal text-muted">
							(sublabel)
						</Label>
					</div>

					<p className="text-xs text-muted">This is a radio description</p>
				</div>
			</div>

			<div className="flex gap-3">
				<RadioGroupItem value="option-3" id="option-3" />
				<div className="flex flex-col gap-1">
					<div className="flex flex-row gap-1">
						<Label htmlFor="option-3" className="font-normal">
							Опция 3
						</Label>
						<Label htmlFor="option-3" className="text-xs font-normal text-muted">
							(sublabel)
						</Label>
					</div>

					<p className="text-xs text-muted">This is a radio description</p>
				</div>
			</div>
		</RadioGroup>
	)
};

export const Outline: Story = {
	render: (args) => (
		<RadioGroup defaultValue="option-1" {...args}>
			<div className="flex gap-3 rounded-lg border border-secondary-border bg-secondary-bg p-4 hover:border-primary-border">
				<RadioGroupItem value="option-1" id="option-1" />
				<div className="flex flex-col gap-1">
					<div className="flex flex-row gap-1">
						<Label htmlFor="option-1" className="font-normal">
							Опция 1
						</Label>
						<Label htmlFor="option-1" className="text-xs font-normal text-muted">
							(sublabel)
						</Label>
					</div>
					<p className="text-xs text-muted">This is a radio description</p>
				</div>
			</div>

			<div className="flex gap-3 rounded-lg border border-secondary-border bg-secondary-bg p-4 hover:border-primary-border">
				<RadioGroupItem value="option-2" id="option-2" />
				<div className="flex flex-col gap-1">
					<div className="flex flex-row gap-1">
						<Label htmlFor="option-2" className="font-normal">
							Опция 2
						</Label>
						<Label htmlFor="option-2" className="text-xs font-normal text-muted">
							(sublabel)
						</Label>
					</div>

					<p className="text-xs text-muted">This is a radio description</p>
				</div>
			</div>

			<div className="flex gap-3 rounded-lg border border-secondary-border bg-secondary-bg p-4 hover:border-primary-border">
				<RadioGroupItem value="option-3" id="option-3" />
				<div className="flex flex-col gap-1">
					<div className="flex flex-row gap-1">
						<Label htmlFor="option-3" className="font-normal">
							Опция 3
						</Label>
						<Label htmlFor="option-3" className="text-xs font-normal text-muted">
							(sublabel)
						</Label>
					</div>

					<p className="text-xs text-muted">This is a radio description</p>
				</div>
			</div>
		</RadioGroup>
	)
};

export const WithTitle: Story = {
	render: (args) => (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-0.5">
				<Label className="text-md">This is a section title</Label>
				<Description>This is a section description</Description>
			</div>
			<RadioGroup defaultValue="option-1" {...args}>
				<div className="flex items-center gap-3">
					<RadioGroupItem value="option-1" id="option-1" />
					<Label htmlFor="option-1">Опция 1</Label>
				</div>
				<div className="flex items-center gap-3">
					<RadioGroupItem value="option-2" id="option-2" />
					<Label htmlFor="option-2">Опция 2</Label>
				</div>
				<div className="flex items-center gap-3">
					<RadioGroupItem value="option-3" id="option-3" />
					<Label htmlFor="option-3">Опция 3</Label>
				</div>
			</RadioGroup>
		</div>
	)
};
