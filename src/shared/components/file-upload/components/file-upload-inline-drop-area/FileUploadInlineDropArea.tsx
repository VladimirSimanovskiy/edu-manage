import React from "react";
import { tv } from "tailwind-variants";
import { FileUploadDropAreaIcon } from "../file-upload-drop-area-icon/FileUploadDropAreaIcon";
import { LucideIcon, Upload } from "lucide-react";

const fileUploadInlineDropAreaStyles = tv({
	slots: {
		wrapper: [
			"has-[:disabled]:pointer-events-none has-[:disabled]:opacity-50",
			"flex min-h-10 items-center rounded-lg border border-dashed border-primary-border bg-secondary-bg p-1.5 transition-colors",
			"hover:bg-secondary-bg-hover",
			"has-[input:focus]:shadow-focus",
			"data-[dragging=true]:bg-secondary-bg-hover"
		],
		icon: "mr-3 size-8 rounded-sm p-2",
		title: "text-sm font-medium text-primary-accent",
		description: "ml-1.5 flex flex-wrap justify-center gap-1.5 text-xs text-primary-fg"
	}
});

export type FileUploadInlineDropAreaProps = React.HTMLAttributes<HTMLDivElement> & {
	title?: React.ReactNode;
	description?: React.ReactNode;
	icon?: LucideIcon;
};

export const FileUploadInlineDropArea = React.forwardRef<HTMLDivElement, FileUploadInlineDropAreaProps>(
	(
		{ className, title = "Upload files", description = "Drag & drop or click to browse", icon, children, ...props },
		ref
	) => {
		const styles = fileUploadInlineDropAreaStyles();

		return (
			<div role="button" className={styles.wrapper({ className })} ref={ref} {...props}>
				<FileUploadDropAreaIcon icon={icon || Upload} className={styles.icon()} />
				<p className={styles.title()}>{title}</p>
				{description && <p className={styles.description()}>{description}</p>}
				{children}
			</div>
		);
	}
);

FileUploadInlineDropArea.displayName = "FileUploadInlineDropArea";
