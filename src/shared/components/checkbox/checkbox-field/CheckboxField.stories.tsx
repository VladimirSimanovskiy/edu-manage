import type { Meta, StoryObj } from "@storybook/react";
import { CheckboxField } from "./CheckboxField";
import { useCallback, useState } from "react";
import type { CheckedState } from "@radix-ui/react-checkbox";

const meta = {
	component: CheckboxField,
	parameters: {
		layout: "centered",
		controls: {
			exclude: ["id"]
		}
	},
	tags: ["autodocs"],
	argTypes: {
		alignment: {
			control: "radio",
			options: ["left", "right"]
		}
	}
} satisfies Meta<typeof CheckboxField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: "Accept terms and conditions",
		description: "By accepting, you agree to our privacy policy and terms of service.",
		id: "checkbox-example",
		error: false,
		disabled: false,
		outline: false
	}
};

export const Error: Story = {
	args: {
		...Default.args,
		error: true
	}
};

export const Disabled: Story = {
	args: {
		...Default.args,
		disabled: true
	}
};

export const Outline: Story = {
	args: {
		...Default.args,
		outline: true
	}
};

const ControlledCheckboxField = () => {
	const [checked, setChecked] = useState<CheckedState>(false);

	const onChange = useCallback((checked: CheckedState) => {
		alert(`State changed! ${checked}`);
		setChecked(checked);
	}, []);

	return (
		<CheckboxField
			checked={checked}
			onCheckedChange={onChange}
			label="Accept terms and conditions"
			description="By accepting, you agree to our privacy policy and terms of service."
		/>
	);
};

export const Controlled: Story = {
	render: () => {
		return <ControlledCheckboxField />;
	}
};
