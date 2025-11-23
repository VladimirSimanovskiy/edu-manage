import React from "react";
import { tv } from "tailwind-variants";
import { FeatureIcon } from "@/components/icon";
import { FeatureIconProps } from "@/components/icon/feature-icon/FeatureIcon";

const fileUploadDropAreaIconStyles = tv({
	base: "shrink-0"
});

export const FileUploadDropAreaIcon: React.FC<FeatureIconProps> = ({ icon, className, ...props }) => {
	return (
		<FeatureIcon
			type="primary"
			size="lg"
			icon={icon}
			className={fileUploadDropAreaIconStyles({ className })}
			{...props}
		/>
	);
};

FileUploadDropAreaIcon.displayName = "FileUploadDropAreaIcon";
