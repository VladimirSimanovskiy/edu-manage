import { Meta, StoryObj } from "@storybook/react";
import { User } from "lucide-react";
import TextInput from "@/components/input/text-input/TextInput";
import { Icon } from "@/components/icon/Icon";
import { Field } from "./Field";

const meta: Meta<typeof Field> = {
	component: Field,
	parameters: {
		layout: "centered",
		controls: {
			exclude: ["control", "className", "labelClassName", "showGap"]
		}
	},
	decorators: [
		(Story) => (
			<div style={{ width: "300px" }}>
				<Story />
			</div>
		)
	]
};

export default meta;

type Story = StoryObj<typeof Field>;

export const Default: Story = {
	args: {
		title: "Имя пользователя",
		layout: "vertical",
		description: "Ваше публичное имя пользователя",
		required: true,
		descriptionPlacement: "text",
		control: ({ readonly, id, error }) => (
			<TextInput
				placeholder="Введите имя пользователя"
				startIcon={<Icon icon={User} />}
				id={id}
				readOnly={readonly}
				error={error}
			/>
		)
	}
};
