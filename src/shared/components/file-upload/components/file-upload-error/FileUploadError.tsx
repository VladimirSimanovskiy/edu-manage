import { Alert, AlertDescription, AlertIcon } from "@/components/alert";
import { AlertCircleIcon } from "lucide-react";
import React from "react";

export type FileUploadErrorProps = React.HTMLAttributes<HTMLDivElement> & {
	error: string | string[];
};

export const FileUploadError = React.forwardRef<HTMLDivElement, FileUploadErrorProps>(({ error, ...props }, ref) => {
	const errorText = Array.isArray(error) ? error.join("\n") : error;
	return (
		<Alert status="error" focus="medium" {...props} ref={ref}>
			<AlertIcon icon={AlertCircleIcon} />
			<AlertDescription className="whitespace-pre-line">{errorText}</AlertDescription>
		</Alert>
	);
});

FileUploadError.displayName = "FileUploadError";
