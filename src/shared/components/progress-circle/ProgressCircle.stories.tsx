import { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { ProgressCircle } from "./ProgressCircle";
import { storyDecorator } from "@/lib/utils/storybook";

const meta: Meta<typeof ProgressCircle> = {
	component: ProgressCircle,
	decorators: [storyDecorator("mx-auto max-w-[600px] w-full flex items-center justify-center gap-4 p-8")],
	tags: ["autodocs"],
	argTypes: {
		size: {
			description: "Размер кругового прогресса",
			control: {
				type: "radio"
			},
			options: ["xs", "sm", "md", "lg", "xl"],
			table: {
				type: { summary: "xs | sm | md | lg | xl" },
				defaultValue: { summary: "md" }
			},
			defaultValue: "md"
		},
		value: {
			description: "Текущее значение прогресса (0-100)",
			control: {
				type: "range",
				min: 0,
				max: 100,
				step: 1
			},
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "0" }
			},
			defaultValue: 0
		},
		max: {
			description: "Максимальное значение прогресса",
			control: {
				type: "number"
			},
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "100" }
			}
		},
		indeterminate: {
			description: "Индикатор неопределенного состояния прогресса",
			control: {
				type: "boolean"
			}
		},
		className: {
			description: "Класс для стилизации",
			control: {
				type: "text"
			}
		},
		indicatorClassName: {
			description: "Класс для стилизации индикатора",
			control: {
				type: "text"
			}
		}
	}
};

export default meta;
type Story = StoryObj<typeof ProgressCircle>;

export const Default: Story = {
	args: {
		value: 65,
		size: "md"
	}
};

export const Animated: Story = {
	render: () => {
		function Animated() {
			const [value, setValue] = useState(0);

			useEffect(() => {
				const interval = setInterval(() => {
					setValue((v) => (v >= 100 ? 0 : v + 2));
				}, 100);

				return () => clearInterval(interval);
			}, []);

			return <ProgressCircle value={value} size="lg" />;
		}

		return <Animated />;
	}
};

export const Indeterminate: Story = {
	args: {
		indeterminate: true,
		size: "lg"
	}
};

export const WithCustomColor: Story = {
	args: {
		indeterminate: true,
		size: "lg",
		indicatorClassName: "text-status-success"
	}
};
