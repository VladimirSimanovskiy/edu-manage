import { FileMetadata, FileValue, useFileUpload, type FileUploadErrorMessages } from "@/hooks/use-file-upload";
import React, { useCallback, useMemo } from "react";
import { tv } from "tailwind-variants";
import { FileUploadBaseProps } from "../FileUpload";
import { FileUploadItemCompact } from "../components/file-upload-item-compact/FileUploadItemCompact";
import { FileUploadError } from "../components/file-upload-error/FileUploadError";
import { FileUploadCompactInputZone } from "../components/file-upload-compact-input-zone/FileUploadCompactInputZone";

const fileUploadStyles = tv({
	base: "flex flex-col gap-2"
});

export type FileUploadCompactProps = Omit<FileUploadBaseProps, "removeBtnText" | "helpText"> & {
	files?: FileValue[];
	onChange?: (files: FileValue[]) => void;
	onRemove?: (file: FileValue, index: number) => void;
	onAdd?: (files: FileValue[]) => void;

	initialFiles?: FileMetadata[];
	className?: string;
	errorMessages?: Partial<FileUploadErrorMessages>;
	renderFileIcon?: (file: FileValue) => React.ReactNode;
};

export const FileUploadCompact = (props: FileUploadCompactProps) => {
	const {
		files,
		onRemove,
		onAdd,
		initialFiles,
		onChange,
		className,
		title,
		description,
		multiple = true,
		errorMessages,
		renderFileIcon,
		...constraints
	} = props;
	const [{ files: stateFiles, isDragging, errors }, actions] = useFileUpload({
		...constraints,
		initialFiles,
		multiple,
		errorMessages,
		onFilesChange: (filesWithPreview) => {
			const files = filesWithPreview.map((file) => file.file);
			onChange?.(files);
		},
		onFilesAdded: (filesWithPreview) => {
			const files = filesWithPreview.map((file) => file.file);
			onAdd?.(files);
		}
	});

	const actualFiles = useMemo(() => {
		return files || stateFiles.map((file) => file.file);
	}, [files, stateFiles]);

	const handleRemoveFile = useCallback(
		(file: FileValue, index: number) => {
			const fileId = stateFiles.find((f) => f.file.name === file.name && f.file.size === file.size)?.id;
			if (fileId) actions.removeFile(fileId);
			onRemove?.(file, index);
		},
		[stateFiles, actions, onRemove]
	);

	return (
		<div className={fileUploadStyles({ className })}>
			<FileUploadCompactInputZone {...actions} isDragging={isDragging} title={title} description={description} />

			{errors.length > 0 && <FileUploadError error={errors} />}

			{actualFiles.length > 0 && (
				<div>
					{actualFiles.map((file, index) => {
						const isFirst = index === 0;
						const isOnly = actualFiles.length === 1;
						const isLast = index === actualFiles.length - 1;

						let itemClassName = "";
						if (isOnly) {
							itemClassName = "";
						} else if (isFirst) {
							itemClassName = "border-b-0 rounded-b-none";
						} else if (isLast) {
							itemClassName = "rounded-t-none";
						} else {
							itemClassName = "border-b-0 rounded-none";
						}

						return (
							<FileUploadItemCompact
								key={index}
								file={file}
								onClear={() => handleRemoveFile(file, index)}
								className={itemClassName}
								renderIcon={renderFileIcon?.(file)}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
};

FileUploadCompact.displayName = "FileUploadCompact";
