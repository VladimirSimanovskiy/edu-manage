import { FileUploadActions } from "@/hooks/use-file-upload/useFileUpload";
import { FileUploadTexts } from "../../FileUpload";
import { FileUploadInlineDropArea } from "../file-upload-inline-drop-area/FileUploadInlineDropArea";

export type FileUploadCompactInputZoneProps = Omit<FileUploadTexts, "removeBtnText" | "helpText"> &
	Pick<
		FileUploadActions,
		"openFileDialog" | "handleDragEnter" | "handleDragLeave" | "handleDragOver" | "handleDrop" | "getInputProps"
	> & {
		isDragging?: boolean;
	};

export const FileUploadCompactInputZone = ({
	isDragging,
	getInputProps,
	openFileDialog,
	handleDragEnter,
	handleDragLeave,
	handleDragOver,
	handleDrop,
	...props
}: FileUploadCompactInputZoneProps) => {
	return (
		<FileUploadInlineDropArea
			onClick={openFileDialog}
			onDragEnter={handleDragEnter}
			onDragLeave={handleDragLeave}
			onDragOver={handleDragOver}
			onDrop={handleDrop}
			data-dragging={isDragging || undefined}
			{...props}
		>
			<input className="sr-only" aria-label="Upload files" {...getInputProps()} />
		</FileUploadInlineDropArea>
	);
};

FileUploadCompactInputZone.displayName = "FileUploadCompactInputZone";
