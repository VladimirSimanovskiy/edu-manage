import type { Meta, StoryObj } from "@storybook/react";
import { AvatarLabel } from "./AvatarLabel";
import { AvatarLabelAvatar } from "./components/avatar-label-avatar/AvatarLabelAvatar";
import { AvatarLabelIndicator } from "./components/avatar-label-indicator/AvatarLabelIndicator";
import { AvatarLabelTitle } from "./components/avatar-label-title/AvatarLabelTitle";
import { AvatarLabelDescription } from "./components/avatar-label-description/AvatarLabelDescription";
import { AvatarImage } from "../avatar-image/AvatarImage";
import { AvatarFallback } from "../avatar-fallback/AvatarFallback";
import { Indicator } from "@/components/indicator";
import React from "react";
import { useAvatarLabelContext, AvatarLabelChild } from "./AvatarLabelContext";
import { AvatarIcon } from "../avatar-icon/AvatarIcon";
import { User } from "lucide-react";

const meta: Meta<typeof AvatarLabel> = {
	component: AvatarLabel,
	tags: ["autodocs"],
	parameters: {
		layout: "centered"
	},
	argTypes: {
		size: {
			control: { type: "select" },
			options: ["sm", "md", "lg", "xl"]
		}
	}
};

export default meta;
type Story = StoryObj<typeof AvatarLabel>;

export const Basic: Story = {
	render: (args) => (
		<AvatarLabel {...args}>
			<AvatarLabelAvatar>
				<AvatarImage src="https://github.com/shadcn.png" />
				<AvatarFallback>CN</AvatarFallback>
			</AvatarLabelAvatar>
			<AvatarLabelTitle>John Doe</AvatarLabelTitle>
			<AvatarLabelDescription>Software Engineer</AvatarLabelDescription>
		</AvatarLabel>
	)
};

export const Image: Story = {
	render: (args) => (
		<AvatarLabel {...args}>
			<AvatarLabelAvatar>
				<AvatarIcon icon={User} />
			</AvatarLabelAvatar>
			<AvatarLabelTitle>John Doe</AvatarLabelTitle>
			<AvatarLabelDescription>Software Engineer</AvatarLabelDescription>
		</AvatarLabel>
	)
};

export const WithIndicator: Story = {
	render: (args) => (
		<AvatarLabel {...args}>
			<AvatarLabelAvatar>
				<AvatarImage src="https://github.com/shadcn.png" />
				<AvatarFallback>CN</AvatarFallback>
			</AvatarLabelAvatar>
			<AvatarLabelIndicator className="bg-status-info" />
			<AvatarLabelTitle>John Doe</AvatarLabelTitle>
			<AvatarLabelDescription>Software Engineer</AvatarLabelDescription>
		</AvatarLabel>
	)
};

export const RevertOrder: Story = {
	render: (args) => (
		<AvatarLabel {...args}>
			<AvatarLabelTitle>Alice Johnson</AvatarLabelTitle>
			<AvatarLabelDescription>Product Manager</AvatarLabelDescription>
			<AvatarLabelAvatar>
				<AvatarImage src="https://github.com/alice.png" />
				<AvatarFallback>AJ</AvatarFallback>
			</AvatarLabelAvatar>
			<AvatarLabelIndicator className="bg-status-success" />
		</AvatarLabel>
	)
};

export const TelegramIndicator: Story = {
	render: (args) => {
		const telegramIcon = (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="100%"
				height="100%"
				viewBox="0 0 24 24"
				fill="none"
				className="h-full w-full"
			>
				<g clipPath="url(#clip0_43_673)">
					<path
						d="M11.9995 24C18.6269 24 23.9995 18.6274 23.9995 12C23.9995 5.37258 18.6269 0 11.9995 0C5.3721 0 -0.000488281 5.37258 -0.000488281 12C-0.000488281 18.6274 5.3721 24 11.9995 24Z"
						fill="url(#paint0_linear_43_673)"
					/>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M5.43153 11.8733C8.92977 10.3492 11.2625 9.3444 12.4297 8.85893C15.7622 7.47282 16.4547 7.23203 16.906 7.22408C17.0053 7.22234 17.2272 7.24694 17.371 7.3636C17.4924 7.46211 17.5258 7.59518 17.5418 7.68857C17.5578 7.78197 17.5777 7.99473 17.5619 8.16098C17.3813 10.0585 16.5998 14.6632 16.2023 16.7884C16.0341 17.6876 15.7029 17.9891 15.3822 18.0186C14.6854 18.0828 14.1562 17.5581 13.4812 17.1157C12.4251 16.4234 11.8284 15.9924 10.8032 15.3168C9.61847 14.536 10.3865 14.1069 11.0617 13.4056C11.2384 13.2221 14.3088 10.4294 14.3682 10.176C14.3757 10.1443 14.3826 10.0262 14.3124 9.96385C14.2422 9.90148 14.1387 9.92281 14.0639 9.93977C13.958 9.96381 12.2708 11.079 9.00227 13.2853C8.52336 13.6142 8.08958 13.7744 7.70092 13.766C7.27246 13.7568 6.44827 13.5238 5.83557 13.3246C5.08407 13.0803 4.48679 12.9512 4.5388 12.5363C4.56589 12.3202 4.86347 12.0992 5.43153 11.8733Z"
						fill="white"
					/>
				</g>
				<defs>
					<linearGradient
						id="paint0_linear_43_673"
						x1="1200"
						y1="0"
						x2="1200"
						y2="2382.2"
						gradientUnits="userSpaceOnUse"
					>
						<stop stopColor="#2AABEE" />
						<stop offset="1" stopColor="#229ED9" />
					</linearGradient>
					<clipPath id="clip0_43_673">
						<rect width="24" height="24" fill="white" transform="translate(-0.000488281)" />
					</clipPath>
				</defs>
			</svg>
		);

		type TelegramIndicatorProps = React.ComponentPropsWithoutRef<typeof Indicator>;

		const AvatarTelegramIndicator = React.forwardRef<React.ElementRef<typeof Indicator>, TelegramIndicatorProps>(
			({ ...props }, ref) => {
				const { size } = useAvatarLabelContext();

				return (
					<Indicator ref={ref} size={size} {...props} rounded>
						{telegramIcon}
					</Indicator>
				);
			}
		) as AvatarLabelChild<TelegramIndicatorProps>;

		AvatarTelegramIndicator.componentType = "indicator";
		AvatarTelegramIndicator.displayName = "AvatarTelegramIndicator";

		return (
			<AvatarLabel {...args}>
				<AvatarLabelTitle>Alice Johnson</AvatarLabelTitle>
				<AvatarLabelDescription>Product Manager</AvatarLabelDescription>
				<AvatarLabelAvatar>
					<AvatarImage src="https://github.com/alice.png" />
					<AvatarFallback>AJ</AvatarFallback>
				</AvatarLabelAvatar>
				<AvatarTelegramIndicator />
			</AvatarLabel>
		);
	}
};
