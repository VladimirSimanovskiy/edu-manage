import type { Meta, StoryObj } from "@storybook/react";
import { ComponentType } from "react";
import { OptionGroup, OptionGroupItem } from "./OptionGroup";

const meta: Meta<typeof OptionGroup> = {
	component: OptionGroup,
	parameters: {
		layout: "centered"
	},
	tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof OptionGroup>;

const withWidth = (Story: ComponentType) => (
	<div style={{ width: "800px" }}>
		<Story />
	</div>
);

export const Default: Story = {
	decorators: [withWidth],
	render: function DefaultOptionGroupExample() {
		return (
			<>
				<OptionGroup type="single">
					<OptionGroupItem value="Да">Да</OptionGroupItem>
					<OptionGroupItem value="Нет">Нет</OptionGroupItem>
					<OptionGroupItem value="Наверное">Наверное</OptionGroupItem>
				</OptionGroup>
			</>
		);
	}
};

export const Playground: StoryObj<typeof OptionGroup> = {
	decorators: [withWidth],
	render: function PlaygroundOptionGroupExample(args) {
		return (
			<>
				<OptionGroup {...args}>
					<OptionGroupItem value="true">Да</OptionGroupItem>
					<OptionGroupItem value="false">Нет</OptionGroupItem>
					<OptionGroupItem value="maybe">50 / 50</OptionGroupItem>
					<OptionGroupItem value="indeterminate">Неизвестно</OptionGroupItem>
				</OptionGroup>
			</>
		);
	},
	args: {
		orientation: "horizontal",
		type: "single"
	},
	argTypes: {
		type: {
			control: "select",
			options: ["multiple", "single"]
		},
		orientation: {
			control: "select",
			options: ["horizontal", "vertical"]
		}
	}
};
