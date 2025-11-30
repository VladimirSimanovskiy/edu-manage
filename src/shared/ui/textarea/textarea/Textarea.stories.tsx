import type { Meta, StoryObj } from "@storybook/react";
import Textarea from "./Textarea";
import { withFixedWidth } from "../../../lib/utils/storybook";

const meta: Meta<typeof Textarea> = {
	component: Textarea,
	tags: ["autodocs"],
	decorators: [withFixedWidth("360px")],
	parameters: {
		layout: "centered"
	}
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
	args: {
		placeholder: "Enter your message..."
	}
};

export const Playground: Story = {
	argTypes: {
		resize: {
			control: "select",
			options: ["both", "horizontal", "vertical", "none"],
			description: "Возможность изменения размера компонента"
		},
		error: {
			control: "text",
			description: "Текст сообщения об ошибке. При наличии делает поле невалидным"
		}
	},
	args: {
		placeholder: "Enter your message...",
		defaultValue:
			"This is a sample text in the textarea component. It demonstrates how the component looks with content.",
		disabled: false,
		readOnly: false,
		error: "",
		resize: "none",
		rows: 5,
		maxLength: 200,
		minLength: 10
	}
};
