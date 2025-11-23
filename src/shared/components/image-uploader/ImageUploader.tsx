import React, { useRef } from "react";
import { tv } from "tailwind-variants";
import { ImageCameraAddSvg } from "./components/ImageCameraAddSvg";
import { Button } from "../button";
import { Image } from "lucide-react";
import { Icon } from "../icon";
import { cn } from "@/lib/utils";
import { VariantsConfig } from "@/lib/utils/variants";

export interface ImageUploaderVariants {
	readonly?: boolean;
	error?: boolean;
	size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const imageUploaderStyles = tv({
	slots: {
		container:
			"group relative flex aspect-square items-center justify-center rounded-xl p-6 hover:shadow-base focus-visible:shadow-focus focus-visible:ring-0",
		icon: "h-8 w-8 stroke-[1.5px] text-muted group-hover:text-primary",
		input: "hidden",
		// Кастомная иконка для состояния загрузки с фиксированными размерами (35 и 33px) и небольшим смещением для визуального баланса
		customIcon: "h-[2.1875rem] w-[2.0625rem] translate-x-0.5 translate-y-0.5"
	},
	variants: {
		readonly: {
			true: {
				container:
					"cursor-default bg-secondary-bg-hover hover:border-secondary-border hover:shadow-sm focus-visible:bg-secondary-bg-hover",
				icon: "group-hover:text-muted"
			}
		},
		error: {
			true: {
				container:
					"border-status-error-secondary-border hover:border-status-error-primary-border hover:bg-status-error-bg focus-visible:border-status-error-secondary-border focus-visible:shadow-focus-error",
				icon: "group-hover:text-muted"
			}
		},
		size: {
			xs: { container: "h-[3.75rem] w-[3.75rem]" },
			sm: { container: "h-20 w-20" },
			md: { container: "h-[7.5rem] w-[7.5rem]" },
			lg: { container: "h-[11.5rem] w-[11.5rem]" },
			xl: { container: "h-96 w-96" }
		}
	} satisfies VariantsConfig<ImageUploaderVariants>
});

export type ImageUploaderProps = Omit<React.ComponentPropsWithoutRef<typeof Button>, "onChange"> &
	ImageUploaderVariants & {
		onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
		whiteList?: string;
	};

export const ImageUploader = React.forwardRef<HTMLButtonElement, ImageUploaderProps>(
	({ className, error, readonly, size, onChange, whiteList = "image/*", ...props }, ref) => {
		const fileInputRef = useRef<HTMLInputElement>(null);
		const styles = imageUploaderStyles({ className, readonly, error, size });

		return (
			<Button
				ref={ref}
				type="button"
				variant="outline"
				className={styles.container()}
				onClick={() => !readonly && fileInputRef.current?.click()}
				{...props}
			>
				<input
					ref={fileInputRef}
					type="file"
					className={styles.input()}
					onChange={onChange}
					accept={whiteList}
				/>

				{readonly && <Icon icon={Image} className={styles.icon()} />}
				{!readonly && <ImageCameraAddSvg className={cn(styles.icon(), styles.customIcon())} />}
			</Button>
		);
	}
);

ImageUploader.displayName = "ImageUploader";
