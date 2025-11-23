import { StoryObj } from "@storybook/react";
import { Factory, Check, Heart, Star, Settings, User, Bell, Calendar } from "lucide-react";
import { Icon } from "./Icon";

const icons = {
	Factory: Factory,
	Heart: Heart,
	Check: Check,
	Star: Star,
	Settings: Settings,
	User: User,
	Bell: Bell,
	Calendar: Calendar
};

const meta = {
	component: Icon,
	parameters: {
		layout: "centered"
	},
	argTypes: {
		size: {
			control: "inline-radio",
			options: ["sm", "md", "lg", "xl"]
		},
		icon: {
			control: { variant: "inline-radio" },
			options: Object.keys(icons),
			mapping: icons
		}
	}
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {
		icon: Factory,
		size: "md"
	}
};
