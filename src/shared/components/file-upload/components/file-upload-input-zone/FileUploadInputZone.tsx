import { FileUploadActions } from "@/hooks/use-file-upload/useFileUpload";
import { FileUploadTexts } from "../../FileUpload";
import { FileUploadDropArea } from "../file-upload-drop-area/FileUploadDropArea";

export type FileUploadInputZoneProps = Omit<FileUploadTexts, "removeBtnText"> &
	Pick<
		FileUploadActions,
		"openFileDialog" | "handleDragEnter" | "handleDragLeave" | "handleDragOver" | "handleDrop" | "getInputProps"
	> & {
		isDragging?: boolean;
	};

export const FileUploadInputZone = ({
	isDragging,
	getInputProps,
	openFileDialog,
	handleDragEnter,
	handleDragLeave,
	handleDragOver,
	handleDrop,
	...props
}: FileUploadInputZoneProps) => {
	return (
		<FileUploadDropArea
			onClick={openFileDialog}
			onDragEnter={handleDragEnter}
			onDragLeave={handleDragLeave}
			onDragOver={handleDragOver}
			onDrop={handleDrop}
			data-dragging={isDragging || undefined}
			{...props}
		>
			<input className="sr-only" aria-label="Upload files" {...getInputProps()} />
		</FileUploadDropArea>
	);
};

FileUploadInputZone.displayName = "FileUploadInputZone";
