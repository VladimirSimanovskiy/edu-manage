import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { tv } from "tailwind-variants";

const Breadcrumb = React.forwardRef<
	HTMLElement,
	React.ComponentPropsWithoutRef<"nav"> & {
		separator?: React.ReactNode;
	}
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);

Breadcrumb.displayName = "Breadcrumb";

const breadcrumbListStyles = tv({
	base: "flex flex-wrap items-center gap-2 break-words text-sm text-muted"
});

const BreadcrumbList = React.forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<"ol">>(
	({ className, ...props }, ref) => <ol ref={ref} className={breadcrumbListStyles({ className })} {...props} />
);

BreadcrumbList.displayName = "BreadcrumbList";

const breadcrumbItemStyles = tv({
	base: "inline-flex items-center gap-1.5 py-2"
});

const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<"li">>(
	({ className, ...props }, ref) => <li ref={ref} className={breadcrumbItemStyles({ className })} {...props} />
);

BreadcrumbItem.displayName = "BreadcrumbItem";

const breadcrumbLinkStyles = tv({
	base: "transition-colors hover:text-primary-fg"
});

const BreadcrumbLink = React.forwardRef<
	HTMLAnchorElement,
	React.ComponentPropsWithoutRef<"a"> & {
		asChild?: boolean;
	}
>(({ asChild, className, ...props }, ref) => {
	const Comp = asChild ? Slot : "a";

	return <Comp ref={ref} className={breadcrumbLinkStyles({ className })} {...props} />;
});

BreadcrumbLink.displayName = "BreadcrumbLink";

const breadcrumbPageStyles = tv({
	base: "font-normal text-primary-fg"
});

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<"span">>(
	({ className, ...props }, ref) => (
		<span
			ref={ref}
			role="link"
			aria-disabled="true"
			aria-current="page"
			className={breadcrumbPageStyles({ className })}
			{...props}
		/>
	)
);

BreadcrumbPage.displayName = "BreadcrumbPage";

const breadcrumbSeparatorStyles = tv({
	base: "[&>svg]:h-4 [&>svg]:w-4"
});

const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<"li">) => (
	<li role="presentation" aria-hidden="true" className={breadcrumbSeparatorStyles({ className })} {...props}>
		{children ?? <ChevronRight />}
	</li>
);

BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const breadcrumbEllipsisStyles = tv({
	slots: {
		wrapper: "flex h-9 w-9 items-center justify-center hover:text-primary-fg",
		more: "h-4 w-4",
		text: "sr-only"
	}
});

const BreadcrumbEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => {
	const styles = breadcrumbEllipsisStyles();

	return (
		<span role="presentation" aria-hidden="true" className={styles.wrapper({ className })} {...props}>
			<MoreHorizontal className={styles.more()} />
			<span className={styles.text()}>More</span>
		</span>
	);
};

BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";

export {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbPage,
	BreadcrumbSeparator,
	BreadcrumbEllipsis
};
