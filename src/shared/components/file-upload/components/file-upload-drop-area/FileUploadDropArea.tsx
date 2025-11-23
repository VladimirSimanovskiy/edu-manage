import React from "react";
import { tv } from "tailwind-variants";
import { FileUploadDropAreaIcon } from "../file-upload-drop-area-icon/FileUploadDropAreaIcon";
import { LucideIcon, Upload } from "lucide-react";

const fileUploadDropAreaStyles = tv({
	slots: {
		wrapper: [
			"has-[:disabled]:pointer-events-none has-[:disabled]:opacity-50",
			"flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed border-primary-border bg-secondary-bg p-6 transition-colors",
			"hover:bg-secondary-bg-hover",
			"has-[input:focus]:shadow-focus",
			"data-[dragging=true]:bg-secondary-bg-hover"
		],
		title: "mb-1.5 text-sm font-medium text-primary-accent",
		icon: "mb-2 size-11",
		description: "mb-2 text-xs text-muted-foreground",
		helpText: "flex flex-wrap justify-center gap-1 text-xs text-primary-fg"
	}
});

export type FileUploadDropAreaProps = React.HTMLAttributes<HTMLDivElement> & {
	title?: React.ReactNode;
	description?: React.ReactNode;
	helpText?: React.ReactNode;
	icon?: LucideIcon;
};

export const FileUploadDropArea = React.forwardRef<HTMLDivElement, FileUploadDropAreaProps>(
	(
		{
			className,
			title = "Upload files",
			description = "Drag & drop or click to browse",
			icon,
			helpText = "All files\n∙\nInfinity files\n∙\nInfinity size",
			children,
			...props
		},
		ref
	) => {
		const styles = fileUploadDropAreaStyles();

		return (
			<div role="button" className={styles.wrapper({ className })} ref={ref} {...props}>
				<FileUploadDropAreaIcon icon={icon || Upload} className={styles.icon()} />
				<p className={styles.title()}>{title}</p>
				{description && <p className={styles.description()}>{description}</p>}
				{helpText && <div className={styles.helpText()}>{helpText}</div>}
				{children}
			</div>
		);
	}
);

FileUploadDropArea.displayName = "FileUploadDropArea";
