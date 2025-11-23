import { FileMetadata, FileUploadConstraints, FileValue, useFileUpload } from "@/hooks/use-file-upload/useFileUpload";
import { useCallback, useMemo } from "react";
import { tv } from "tailwind-variants";
import { FileUploadClearButton } from "./components/file-upload-clear-button/FileUploadClearButton";
import { FileUploadError } from "./components/file-upload-error/FileUploadError";
import { FileUploadInputZone } from "./components/file-upload-input-zone/FileUploadInputZone";
import { FileUploadItem } from "./components/file-upload-item/FileUploadItem";
import { FileUploadErrorMessages } from "@/hooks/use-file-upload";

const fileUploadStyles = tv({
	base: "flex flex-col gap-2"
});

export type FileUploadTexts = {
	title?: string;
	description?: string;
	helpText?: string;
	removeBtnText?: string;
};

export type FileUploadBaseProps = FileUploadConstraints & FileUploadTexts;

export type FileUploadProps = FileUploadBaseProps & {
	files?: FileValue[];
	onChange?: (files: FileValue[]) => void;
	onRemove?: (file: FileValue, index: number) => void;
	onAdd?: (files: FileValue[]) => void;
	onClear?: () => void;

	initialFiles?: FileMetadata[];
	className?: string;
	errorMessages?: Partial<FileUploadErrorMessages>;
};

export const FileUpload = (props: FileUploadProps) => {
	const {
		files,
		onRemove,
		onAdd,
		onClear,
		initialFiles,
		onChange,
		className,
		title,
		description,
		helpText,
		removeBtnText,
		errorMessages,
		multiple = true,
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

	const handleClearAll = useCallback(() => {
		actions.clearFiles();
		onClear?.();
	}, [actions, onClear]);

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
			<FileUploadInputZone
				{...actions}
				isDragging={isDragging}
				title={title}
				description={description}
				helpText={helpText}
			/>

			{errors.length > 0 && <FileUploadError error={errors} />}

			{actualFiles.length > 0 && (
				<div className="space-y-2">
					{actualFiles.map((file, index) => (
						<FileUploadItem key={index} file={file} onClear={() => handleRemoveFile(file, index)} />
					))}
					{actualFiles.length > 1 && (
						<FileUploadClearButton onClick={handleClearAll}>{removeBtnText}</FileUploadClearButton>
					)}
				</div>
			)}
		</div>
	);
};

FileUpload.displayName = "FileUpload";
