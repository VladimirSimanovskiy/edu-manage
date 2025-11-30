import { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { Progress } from "./Progress";
import { storyDecorator } from "@/lib/utils/storybook";

const meta: Meta<typeof Progress> = {
	component: Progress,
	decorators: [storyDecorator("mx-auto max-w-[600px] w-full")],
	tags: ["autodocs"],
	argTypes: {
		size: {
			description: "Размер прогресс-бара",
			control: {
				type: "radio"
			},
			options: ["sm", "md", "lg"],
			table: {
				type: { summary: "sm | md | lg" },
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
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
	args: {
		value: 50,
		size: "md"
	}
};

export const Animated: Story = {
	render: function DefaultFuntion(args) {
		const [value, setValue] = useState(0);

		useEffect(() => {
			const interval = setInterval(() => {
				setValue((v) => (v >= 100 ? 0 : v + 10));
			}, 500);
			return () => clearInterval(interval);
		}, []);

		return <Progress value={value} {...args} />;
	}
};

export const Indeterminate: Story = {
	args: {
		indeterminate: true,
		size: "md"
	}
};
