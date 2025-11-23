import * as React from "react";
import { type DialogProps } from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../dialog/Dialog";
import { tv } from "tailwind-variants";
import { menuItemStyles } from "../menu-item";
import { emptyStateStyles } from "../empty-state/EmptyState";
import { Icon } from "../icon";
import { useComponentVariant } from "@/providers/component-variant-context";

const commandStyles = tv({
	base: "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
	variants: {
		theme: {
			inverse: "bg-inverse-primary-bg text-inverse-primary-fg"
		}
	}
});

const Command = React.forwardRef<
	React.ElementRef<typeof CommandPrimitive>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => {
	const { variant: theme } = useComponentVariant();

	return (
		<CommandPrimitive ref={ref} data-slot="command" className={commandStyles({ className, theme })} {...props} />
	);
});
Command.displayName = CommandPrimitive.displayName;

const commandDialogStyles = tv({
	slots: {
		content: "overflow-hidden p-0",
		command:
			"[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-1.5 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"
	}
});

const CommandDialog = ({
	title = "Command Palette",
	description = "Search for a command to run...",
	children,
	className,
	...props
}: DialogProps & {
	title?: string;
	description?: string;
	className?: string;
}) => {
	const styles = commandDialogStyles();
	return (
		<Dialog {...props}>
			<DialogHeader className="sr-only">
				<DialogTitle>{title}</DialogTitle>
				<DialogDescription>{description}</DialogDescription>
			</DialogHeader>
			<DialogContent className={styles.content({ className })}>
				<Command className={styles.command()}>{children}</Command>
			</DialogContent>
		</Dialog>
	);
};

const commandInputStyles = tv({
	slots: {
		wrapper: "flex items-center border-b border-secondary-border px-3",
		search: "mr-2 h-4 w-4 shrink-0 text-muted",
		input: "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted disabled:cursor-not-allowed disabled:opacity-50"
	},
	variants: {
		theme: {
			inverse: {
				wrapper: "border-inverse-border",
				input: "placeholder:text-inverse-muted placeholder:opacity-50"
			}
		}
	}
});

type CommandInputProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input> & {
	wrapperClassName?: string;
};

const CommandInput = React.forwardRef<React.ElementRef<typeof CommandPrimitive.Input>, CommandInputProps>(
	({ className, wrapperClassName, ...props }, ref) => {
		const { variant: theme } = useComponentVariant();
		const styles = commandInputStyles({ theme });

		return (
			<div
				className={styles.wrapper({ className: wrapperClassName })}
				data-slot="command-input-wrapper"
				cmdk-input-wrapper=""
			>
				<Icon icon={Search} className={styles.search()} />
				<CommandPrimitive.Input
					ref={ref}
					data-slot="command-input"
					className={styles.input({ className })}
					{...props}
				/>
			</div>
		);
	}
);

CommandInput.displayName = CommandPrimitive.Input.displayName;

const commandListStyles = tv({
	base: "max-h-[300px] overflow-y-auto overflow-x-hidden outline-none"
});

const CommandList = React.forwardRef<
	React.ElementRef<typeof CommandPrimitive.List>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
	<CommandPrimitive.List ref={ref} data-slot="command-list" className={commandListStyles({ className })} {...props} />
));

CommandList.displayName = CommandPrimitive.List.displayName;

const commandEmptyStyles = tv({
	extend: emptyStateStyles,
	base: "px-3 py-6",
	variants: {
		theme: {
			inverse: "text-inverse-primary-fg"
		}
	}
});

const CommandEmpty = React.forwardRef<
	React.ElementRef<typeof CommandPrimitive.Empty>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>(({ className, ...props }, ref) => {
	const { variant: theme } = useComponentVariant();

	return (
		<CommandPrimitive.Empty
			ref={ref}
			data-slot="command-empty"
			className={commandEmptyStyles({ className, theme })}
			{...props}
		/>
	);
});

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const commandGroupStyles = tv({
	base: "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
	variants: {
		theme: {
			inverse: "text-inverse-primary-fg [&_[cmdk-group-heading]]:text-inverse-muted"
		}
	}
});

const CommandGroup = React.forwardRef<
	React.ElementRef<typeof CommandPrimitive.Group>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => {
	const { variant: theme } = useComponentVariant();

	return (
		<CommandPrimitive.Group
			ref={ref}
			data-slot="command-group"
			className={commandGroupStyles({ className, theme })}
			{...props}
		/>
	);
});

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const commandSeparatorStyles = tv({
	base: "-mx-1 h-px bg-secondary-border",
	variants: {
		theme: {
			inverse: "bg-inverse-border"
		}
	}
});

const CommandSeparator = React.forwardRef<
	React.ElementRef<typeof CommandPrimitive.Separator>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => {
	const { variant: theme } = useComponentVariant();

	return (
		<CommandPrimitive.Separator
			ref={ref}
			data-slot="command-separator"
			className={commandSeparatorStyles({ className, theme })}
			{...props}
		/>
	);
});
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const commandItemStyles = tv({
	extend: menuItemStyles,
	base: "data-[disabled=true]:pointer-events-none data-[selected=true]:bg-secondary-bg-hover data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
	variants: {
		theme: {
			inverse:
				"bg-inverse-primary-bg text-inverse-primary-fg data-[selected=true]:bg-inverse-hover data-[selected=true]:text-inverse-primary-fg"
		}
	}
});

const CommandItem = React.forwardRef<
	React.ElementRef<typeof CommandPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, disabled, children, ...props }, ref) => {
	const { variant: theme } = useComponentVariant();

	return (
		<CommandPrimitive.Item
			disabled={disabled}
			ref={ref}
			data-slot="command-item"
			className={commandItemStyles({ className, disabled, theme })}
			{...props}
		>
			{children}
		</CommandPrimitive.Item>
	);
});

CommandItem.displayName = CommandPrimitive.Item.displayName;

const commandShortcutStyles = tv({
	base: "ml-auto text-xs tracking-widest text-muted-foreground",
	variants: {
		theme: {
			inverse: "text-inverse-muted"
		}
	}
});

const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
	const { variant: theme } = useComponentVariant();

	return <span data-slot="command-shortcut" className={commandShortcutStyles({ className, theme })} {...props} />;
};
CommandShortcut.displayName = "CommandShortcut";

export {
	Command,
	CommandDialog,
	CommandInput,
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandShortcut,
	CommandSeparator
};
