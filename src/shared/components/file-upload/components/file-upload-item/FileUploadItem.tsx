import { IconButton } from "@/components/button";
import { FileData } from "@/hooks/use-file-upload/useFileUpload";
import { formatBytes } from "@/lib/utils/file/formatBytes";
import { XIcon } from "lucide-react";
import React from "react";
import { tv } from "tailwind-variants";
import { FileUploadIcon } from "../file-upload-icon/FileUploadIcon";

const fileUploadItemStyles = tv({
	slots: {
		wrapper: "flex justify-between gap-2 rounded-lg border border-secondary-border bg-background p-3 pe-3",
		icon: "-me-3 -mt-3 size-9 text-muted hover:bg-transparent",
		infoWrapper: "flex items-center gap-2.5 overflow-hidden",
		textWrapper: "flex min-w-0 flex-col gap-0.5",
		title: "truncate text-sm font-medium",
		description: "text-xs text-muted"
	}
});

export type FileUploadItemProps = React.HTMLAttributes<HTMLDivElement> & {
	onClear: () => void;
	file: FileData;
};

export const FileUploadItem = React.forwardRef<HTMLDivElement, FileUploadItemProps>(
	({ onClear, file, className, ...props }, ref) => {
		const styles = fileUploadItemStyles();

		return (
			<div className={styles.wrapper({ className })} ref={ref} {...props}>
				<div className={styles.infoWrapper()}>
					<FileUploadIcon file={file} />

					<div className={styles.textWrapper()}>
						<p className={styles.title()}>{file.name}</p>
						<p className={styles.description()}>{formatBytes(file.size)}</p>
					</div>
				</div>

				<IconButton
					variant="ghost"
					type="button"
					icon={XIcon}
					className={styles.icon()}
					onClick={onClear}
					aria-label="Remove file"
				/>
			</div>
		);
	}
);

FileUploadItem.displayName = "FileUploadItem";
