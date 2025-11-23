import { FeatureIcon } from "@/components/icon";
import { tv } from "tailwind-variants";
import { FileData } from "@/hooks/use-file-upload/useFileUpload";
import { useFileType } from "@/hooks/useFileType";

const fileIconStyles = tv({
	base: "size-10 shrink-0 rounded border border-primary-border bg-secondary-bg-hover p-2.5 text-muted"
});

export interface FileUploadIconProps {
	file: FileData;
}

export const FileUploadIcon = ({ file }: FileUploadIconProps) => {
	const IconComponent = useFileType(file);

	return <FeatureIcon icon={IconComponent} className={fileIconStyles()} />;
};
