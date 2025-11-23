import React, { useCallback, KeyboardEvent } from "react";
import { tv } from "tailwind-variants";
import { ImageUploaderButton } from "../image-uploader/components/ImageUploaderButton";
import { Download, ImageOff, RotateCw, X } from "lucide-react";
import { Icon } from "../icon";
import { VariantsConfig } from "@/lib/utils/variants";

export interface ImagePreviewVariants {
	size?: "xs" | "sm" | "md" | "lg" | "xl";
	error?: boolean;
}

const imagePreviewStyles = tv({
	slots: {
		container:
			"group relative flex aspect-square cursor-pointer items-center justify-center rounded-xl outline-none focus-visible:shadow-focus",
		image: "aspect-square h-full rounded-xl",
		buttonWrapper: "absolute right-1 top-1 flex gap-1",
		icon: "h-8 w-8 stroke-[1.5px] text-muted",
		overlay: "absolute inset-0 rounded-xl group-hover:bg-slate-900/20"
	},
	variants: {
		error: {
			true: {
				container:
					"outline outline-1 outline-status-error-secondary-border hover:bg-status-error-bg hover:outline-status-error-primary-border focus-visible:shadow-focus-error focus-visible:outline-status-error-secondary-border"
			}
		},
		size: {
			xs: { container: "h-[3.75rem] w-[3.75rem]" },
			sm: { container: "h-20 w-20" },
			md: { container: "h-[7.5rem] w-[7.5rem]" },
			lg: { container: "h-[11.5rem] w-[11.5rem]" },
			xl: { container: "h-96 w-96" }
		}
	} satisfies VariantsConfig<ImagePreviewVariants>
});

export type ImagePreviewProps = Omit<React.HTMLAttributes<HTMLDivElement>, "onClick"> &
	ImagePreviewVariants & {
		url: string;
		alt: string;
		readonly?: boolean;
		onImageClick?: (e: React.MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => void;
		onDownload?: (url: string) => void;
		onRetry?: () => void;
		onClear?: () => void;
	};

export const ImagePreview = React.forwardRef<HTMLDivElement, ImagePreviewProps>(
	({ className, error, readonly, onClear, onRetry, size, url, alt, onImageClick, onDownload, ...props }, ref) => {
		const styles = imagePreviewStyles({ className, size, error });

		const handleDownload = useCallback(
			(e: React.MouseEvent<HTMLButtonElement>) => {
				e.preventDefault();
				e.stopPropagation();
				onDownload?.(url);
			},
			[onDownload, url]
		);

		const handleClear = useCallback(
			(e: React.MouseEvent<HTMLButtonElement>) => {
				e.preventDefault();
				e.stopPropagation();
				onClear?.();
			},
			[onClear]
		);

		const handleRetry = useCallback(
			(e: React.MouseEvent<HTMLButtonElement>) => {
				e.preventDefault();
				e.stopPropagation();
				onRetry?.();
			},
			[onRetry]
		);

		const handleKeyDown = useCallback(
			(e: KeyboardEvent<HTMLDivElement>) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					onImageClick?.(e);
				}
			},
			[onImageClick]
		);

		return (
			<div
				ref={ref}
				role="button"
				tabIndex={0}
				onClick={onImageClick}
				onKeyDown={handleKeyDown}
				className={styles.container()}
				{...props}
			>
				{!error && <img src={url} alt={alt} className={styles.image()} />}
				{!error && <div className={styles.overlay()} />}

				{error && <Icon icon={ImageOff} className={styles.icon()} />}

				<div className={styles.buttonWrapper()}>
					{!error && onDownload && <ImageUploaderButton icon={Download} onClick={handleDownload} />}
					{error && onRetry && <ImageUploaderButton icon={RotateCw} onClick={handleRetry} />}
					{!readonly && onClear && <ImageUploaderButton icon={X} onClick={handleClear} />}
				</div>
			</div>
		);
	}
);

ImagePreview.displayName = "ImagePreview";
