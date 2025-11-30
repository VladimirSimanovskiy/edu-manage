import type { Meta, StoryObj } from "@storybook/react";
import { WebInput } from "./WebInput";
import React from "react";
import { ButtonBase } from "@/components/button/button-base/ButtonBase";

const meta: Meta<typeof WebInput> = {
	component: WebInput,
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div style={{ width: "480px" }}>
				<Story />
			</div>
		)
	],
	parameters: {
		layout: "centered"
	}
};

export default meta;
type Story = StoryObj<typeof WebInput>;

export const Default: Story = {
	args: {
		placeholder: "example.com"
	}
};

export const WithCustomPrefix: Story = {
	args: {
		startContent: "http://",
		placeholder: "example.com"
	}
};

export const WithValue: Story = {
	args: {
		defaultValue: "example.com",
		placeholder: "Введите доменное имя"
	}
};

export const WithoutClearButton: Story = {
	args: {
		defaultValue: "example.com",
		showClearIcon: false,
		placeholder: "Без кнопки очистки"
	}
};

export const WithoutCopyButton: Story = {
	args: {
		defaultValue: "example.com",
		showCopyIcon: false,
		placeholder: "Без кнопки копирования"
	}
};

export const ReadOnly: Story = {
	args: {
		defaultValue: "example.com",
		readOnly: true,
		placeholder: "Только для чтения"
	}
};

export const Disabled: Story = {
	args: {
		defaultValue: "example.com",
		disabled: true,
		placeholder: "Отключено"
	}
};

export const WithError: Story = {
	args: {
		defaultValue: "invalid-url",
		error: "Введите корректный URL",
		placeholder: "С ошибкой"
	}
};

export const Controlled: Story = {
	render: function ControlledWebInput() {
		const [value, setValue] = React.useState<string | null>("example.com");

		return (
			<div className="flex flex-col gap-4">
				<WebInput placeholder="Контролируемое поле" value={value ?? ""} onChange={setValue} />
				<div className="text-sm text-muted">Полный URL: https://{value}</div>
				<div className="flex gap-2">
					<ButtonBase onClick={() => setValue("google.com")}>Установить Google</ButtonBase>
					<ButtonBase onClick={() => setValue("github.com")}>Установить GitHub</ButtonBase>
					<ButtonBase onClick={() => setValue("")}>Очистить</ButtonBase>
				</div>
			</div>
		);
	}
};
