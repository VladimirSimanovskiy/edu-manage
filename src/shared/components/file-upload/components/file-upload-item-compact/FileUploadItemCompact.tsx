import { IconButton } from "@/components/button";
import { FileData } from "@/hooks/use-file-upload/useFileUpload";
import { formatBytes } from "@/lib/utils/file/formatBytes";
import { XIcon } from "lucide-react";
import React from "react";
import { tv } from "tailwind-variants";
import { useFileType } from "@/hooks/useFileType";
import { Icon } from "@/components/icon";

const fileUploadItemCompactStyles = tv({
	slots: {
		wrapper: "flex h-10 items-center gap-2 rounded-lg border border-secondary-border bg-background p-2.5",
		icon: "text-muted",
		clear: "-me-2.5 size-10 p-3 text-muted hover:bg-transparent",
		infoWrapper: "flex w-full items-center overflow-hidden",
		textWrapper: "flex w-full items-center justify-between",
		title: "truncate text-sm font-medium",
		description: "text-xs text-muted"
	}
});

export type FileUploadItemCompactProps = React.HTMLAttributes<HTMLDivElement> & {
	onClear: () => void;
	file: FileData;
	renderIcon?: React.ReactNode;
};

export const FileUploadItemCompact = React.forwardRef<HTMLDivElement, FileUploadItemCompactProps>(
	({ onClear, file, className, renderIcon, ...props }, ref) => {
		const styles = fileUploadItemCompactStyles();
		const IconComponent = useFileType(file);

		return (
			<div className={styles.wrapper({ className })} ref={ref} {...props}>
				{renderIcon ?? <Icon icon={IconComponent} size="lg" className={styles.icon()} />}

				<div className={styles.infoWrapper()}>
					<div className={styles.textWrapper()}>
						<p className={styles.title()}>{file.name}</p>
						<p className={styles.description()}>{formatBytes(file.size)}</p>
					</div>

					<IconButton
						variant="ghost"
						type="button"
						icon={XIcon}
						className={styles.clear()}
						onClick={onClear}
						aria-label="Remove file"
					/>
				</div>
			</div>
		);
	}
);

FileUploadItemCompact.displayName = "FileUploadItemCompact";
