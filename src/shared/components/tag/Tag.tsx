import React, { PropsWithChildren } from "react";
import { tv } from "tailwind-variants";
import { Slot } from "@radix-ui/react-slot";
import { LucideIcon, X } from "lucide-react";
import { Divider } from "../divider";
import { Icon } from "../icon";
import { ButtonProps } from "../button/button/Button";
import { VariantsConfig } from "@/lib/utils/variants";

export interface TagBaseVariants {
	status?: "default" | "info" | "success" | "warning" | "error";
	focus?: "low" | "high";
	size?: "sm" | "md" | "lg";
}

const tagBaseStyles = tv({
	base: "inline-flex items-center justify-center overflow-hidden font-medium leading-none transition-colors",
	variants: {
		status: {
			default: "border-primary-border bg-status-neutral-bg text-primary-fg hover:bg-status-neutral-bg-hover",
			info: "border-status-info-border bg-status-info-bg text-status-info hover:bg-status-info-bg-hover",
			success:
				"border-status-success-border bg-status-success-bg text-status-success hover:bg-status-success-bg-hover",
			warning:
				"border-status-warning-border bg-status-warning-bg text-status-warning hover:bg-status-warning-bg-hover",
			error: "border-status-error-border bg-status-error-bg text-status-error hover:bg-status-error-bg-hover"
		},
		focus: {
			low: "shadow-sm",
			high: "shadow-base"
		},
		size: {
			sm: "h-5 px-1.5 py-1 text-xs",
			md: "h-6 px-1.5 py-1 text-sm",
			lg: "h-7 px-2 py-1 text-base"
		}
	} satisfies VariantsConfig<TagBaseVariants>,
	defaultVariants: {
		status: "default",
		focus: "low",
		size: "md"
	},
	compoundVariants: [
		{
			status: ["info", "success", "warning", "error"],
			focus: "high",
			class: "text-white"
		},
		{
			status: "default",
			focus: "high",
			class: "border-transparent bg-status-neutral text-primary-bg hover:bg-status-neutral-hover"
		},
		{
			status: "info",
			focus: "high",
			class: "border-transparent bg-status-info hover:bg-status-info-hover"
		},
		{
			status: "success",
			focus: "high",
			class: "border-transparent bg-status-success hover:bg-status-success-hover"
		},
		{
			status: "warning",
			focus: "high",
			class: "border-transparent bg-status-warning hover:bg-status-warning-hover"
		},
		{
			status: "error",
			focus: "high",
			class: "border-transparent bg-status-error hover:bg-status-error-hover"
		}
	]
});

export type TagBaseProps = React.HTMLAttributes<HTMLElement> &
	TagBaseVariants & {
		asChild?: boolean;
	};

export const TagBase = ({ asChild = false, children, ...props }: PropsWithChildren<TagBaseProps>) => {
	const Comp = asChild ? Slot : "span";
	return (
		<Comp className={tagBaseStyles(props)} {...props}>
			{children}
		</Comp>
	);
};

TagBase.displayName = "TagBase";

export interface TagButtonVariants {
	size?: "sm" | "md" | "lg";
	clickable?: boolean;
	position?: "standalone" | "left" | "right" | "middle";
}

const tagButtonStyles = tv({
	extend: tagBaseStyles,
	base: "flex cursor-pointer items-center justify-center whitespace-nowrap rounded-sm border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary",
	variants: {
		size: {
			sm: "gap-1",
			md: "gap-1",
			lg: "gap-1.5"
		},
		clickable: {
			false: "cursor-default"
		},
		position: {
			standalone: "",
			left: "rounded-r-none border-r-0",
			right: "rounded-l-none border-l-0",
			middle: "rounded-none border-l-0 border-r-0"
		}
	} satisfies VariantsConfig<TagButtonVariants>,
	defaultVariants: {
		clickable: true,
		position: "standalone"
	}
});

export type TagButtonProps = React.HTMLAttributes<HTMLElement> &
	TagButtonVariants &
	Omit<TagBaseVariants, "size"> & {
		asChild?: boolean;
	};

export const TagButton = (props: PropsWithChildren<TagButtonProps>) => {
	const { asChild = false, children, className, ...rest } = props;
	const Comp = asChild ? Slot : "button";
	const styles = tagButtonStyles({ className, ...rest });
	return (
		<Comp className={styles} {...rest}>
			{children}
		</Comp>
	);
};

TagButton.displayName = "TagButton";

export interface TagCloseVariants {
	size?: "sm" | "md" | "lg";
	focus?: "low" | "high";
}

const tagCloseStyles = tv({
	extend: tagBaseStyles,
	base: "aspect-square cursor-pointer rounded-l-none rounded-r-sm border border-l-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary",
	variants: {
		size: {
			sm: "h-5 p-1 text-xs",
			md: "h-6 p-1 text-sm",
			lg: "h-7 p-1.5 text-base"
		},
		focus: {
			low: "!text-primary-fg",
			high: ""
		}
	} satisfies VariantsConfig<TagCloseVariants>
});

const tagIconStyles = tv({
	base: "aspect-square flex-shrink-0",
	variants: {
		size: {
			sm: "h-3 w-3",
			md: "h-3.5 w-3.5",
			lg: "h-4 w-4"
		}
	}
});

export type TagCloseProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
	TagCloseVariants &
	Omit<TagBaseVariants, "size"> & {
		icon?: LucideIcon;
		tag?: React.ElementType;
	};

export const TagClose = (props: TagCloseProps) => {
	const { icon = X, size, tag: Tag = "button", className, ...rest } = props;
	const styles = tagCloseStyles({ className, size, ...rest });
	return (
		<Tag type="button" className={styles} aria-label="Удалить" size={size} {...rest}>
			<Icon icon={icon} className={tagIconStyles({ size })} />
		</Tag>
	);
};

TagClose.displayName = "TagClose";

export interface TagDividerVariants {
	status?: "default" | "info" | "success" | "warning" | "error";
}

const tagDividerStyles = tv({
	base: "",
	variants: {
		status: {
			default: "bg-primary-border",
			info: "bg-status-info-border",
			success: "bg-status-success-border",
			warning: "bg-status-warning-border",
			error: "bg-status-error-border"
		}
	} satisfies VariantsConfig<TagDividerVariants>,
	defaultVariants: {
		status: "default"
	}
});

export type TagDividerProps = React.HTMLAttributes<HTMLDivElement> & TagDividerVariants;

export const TagDivider = (props: TagDividerProps) => {
	const { status, ...rest } = props;
	return <Divider orientation="vertical" className={tagDividerStyles({ status })} {...rest} />;
};

TagDivider.displayName = "TagDivider";

export interface TagWrapperVariants {
	size?: "sm" | "md" | "lg";
}

const tagWrapperStyles = tv({
	base: "inline-flex items-center rounded-sm",
	variants: {
		size: {
			sm: "h-5",
			md: "h-6",
			lg: "h-7"
		}
	} satisfies VariantsConfig<TagWrapperVariants>
});

export type TagWrapperProps = React.HTMLAttributes<HTMLDivElement> & TagWrapperVariants;

export const TagWrapper = (props: TagWrapperProps) => {
	const { children, className, size, ...rest } = props;
	const styles = tagWrapperStyles({ className, size });
	return (
		<div className={styles} {...rest}>
			{children}
		</div>
	);
};

export type TagProps = PropsWithChildren<
	Pick<TagBaseVariants, "focus" | "size"> &
		ButtonProps & {
			onLabelClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
			onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
			className?: string;
			buttonClassName?: string;
		}
>;

export const Tag = (props: TagProps) => {
	const {
		startIcon: StartIcon,
		endIcon: EndIcon,
		children,
		onLabelClick,
		onClose,
		status,
		focus,
		size = "md",
		className,
		buttonClassName,
		...rest
	} = props;
	const hasClose = Boolean(onClose);

	const startIconEl = StartIcon && <StartIcon className={tagIconStyles({ size })} />;
	const endIconEl = EndIcon && <EndIcon className={tagIconStyles({ size })} />;

	return (
		<TagWrapper size={size} className={className}>
			<TagButton
				position={hasClose ? "left" : undefined}
				status={status}
				focus={focus}
				size={size}
				onClick={onLabelClick}
				className={buttonClassName}
				{...rest}
			>
				{startIconEl}
				{children}
				{endIconEl}
			</TagButton>

			{hasClose && (
				<>
					<TagDivider status={status} />
					<TagClose status={status} focus={focus} size={size} onClick={onClose} />
				</>
			)}
		</TagWrapper>
	);
};

Tag.displayName = "Tag";
