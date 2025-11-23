import { Meta, StoryObj } from "@storybook/react";
import { RichButton } from "./RichButton";
import { Flower, Settings, User, Star, Heart, ShoppingCart } from "lucide-react";
import { withFixedWidth } from "../../../lib/utils/storybook";

const meta = {
	component: RichButton,
	parameters: {
		layout: "centered"
	},
	decorators: [withFixedWidth("360px")],
	tags: ["autodocs"],
	argTypes: {
		size: {
			control: { type: "select" },
			options: ["sm", "lg"]
		},
		icon: {
			control: { type: "select" },
			options: ["Flower", "Settings", "User", "Star", "Heart", "ShoppingCart"],
			mapping: {
				Flower,
				Settings,
				User,
				Star,
				Heart,
				ShoppingCart
			}
		}
	}
} satisfies Meta<typeof RichButton>;

export default meta;
type Story = StoryObj<typeof RichButton>;

export const Default: Story = {
	args: {
		icon: Flower,
		title: "Item title",
		description: "Supporting text",
		size: "sm",
		disabled: false
	}
};
