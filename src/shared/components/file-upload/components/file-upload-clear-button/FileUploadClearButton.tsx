import { Button, ButtonProps } from "../../../button";

/**
 * Кнопка для удаления всех файлов в компоненте загрузки файлов
 */
export type FileUploadClearButtonProps = ButtonProps;

export const FileUploadClearButton = ({ children = "Remove all files", ...props }: FileUploadClearButtonProps) => {
	return (
		<Button size="sm" variant="outline" type="button" {...props}>
			{children}
		</Button>
	);
};

FileUploadClearButton.displayName = "FileUploadClearButton";
