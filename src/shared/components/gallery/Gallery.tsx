import React, { useCallback, useState } from "react";
import { Carousel, CarouselContent } from "../carousel/Carousel";
import { ImageUploader } from "../image-uploader/ImageUploader";
import { ImagePlaceholder } from "../image-placeholder/ImagePlaceholder";
import { ImagePreview } from "../image-preview/ImagePreview";
import { tv } from "tailwind-variants";
import { FileInfo } from "../input/file-input/FileInput";
import { CarouselItem } from "../carousel";
import { Modal, ModalContent, ModalHeader, ModalTitle } from "../modal/Modal";
import { downloadFile } from "@/lib/utils/file/downloadFile";
import { fileToFileInfo } from "@/lib/utils/image/imageConverter";

const galleryStyles = tv({
	base: "w-full",
	slots: {
		carouselContent: "p-0.5"
	}
});

export interface GalleryProps extends React.HTMLAttributes<HTMLDivElement> {
	/** Размер галереи */
	size?: "xs" | "sm" | "md" | "lg" | "xl";
	/** Направление галереи */
	orientation?: "horizontal" | "vertical";
	/** Массив изображений */
	values?: FileInfo[];
	/** Колбэк при изменении значений */
	onValueChange?: (values: FileInfo[]) => void;
	/** Колбэк при повторной попытке загрузки */
	onImageRetry?: (id: number) => void;
	/** Флаг только для чтения */
	readonly?: boolean;
	/** Количество плейсхолдеров */
	placeholderCount?: number;
	/** Отключает возможность скачивания изображений из галереи */
	preventDownload?: boolean;
}

export const Gallery = React.forwardRef<HTMLDivElement, GalleryProps>(
	(
		{
			size = "md",
			orientation = "horizontal",
			values = [],
			onValueChange,
			onImageRetry,
			readonly = false,
			placeholderCount = 10,
			className,
			preventDownload,
			...props
		},
		ref
	) => {
		const styles = galleryStyles();
		const [modalImage, setModalImage] = useState<FileInfo | null>(null);

		const handleImageUpload = useCallback(
			async (event: React.ChangeEvent<HTMLInputElement>) => {
				const file = event.target.files?.[0];
				if (file) {
					const newImage = fileToFileInfo(file);
					onValueChange?.([newImage, ...values]);
				}
			},
			[onValueChange, values]
		);

		const handleImageRemove = useCallback(
			(id: number) => {
				const newValues = values.filter((value) => value.id !== id);
				onValueChange?.(newValues);
			},
			[onValueChange, values]
		);

		const handleImageClick = useCallback((image: FileInfo) => {
			setModalImage(image);
		}, []);

		const handleImageDownload = useCallback((image: FileInfo) => downloadFile(image), []);

		return (
			<div ref={ref} className={styles.base({ className })} {...props}>
				<Carousel size={size} orientation={orientation} opts={{ watchDrag: !!values.length }}>
					<CarouselContent className={styles.carouselContent()}>
						{!readonly && (
							<CarouselItem key="uploader">
								<ImageUploader size={size} onChange={handleImageUpload} readonly={readonly} />
							</CarouselItem>
						)}

						{values.map((value, index) => (
							<CarouselItem key={index}>
								<ImagePreview
									size={size}
									url={value.url}
									alt={`Image ${value.id}`}
									readonly={readonly}
									onImageClick={() => handleImageClick(value)}
									onDownload={preventDownload ? undefined : () => handleImageDownload(value)}
									onClear={() => handleImageRemove(value.id)}
									onRetry={() => onImageRetry?.(value.id)}
								/>
							</CarouselItem>
						))}

						{Array.from({ length: placeholderCount - values.length }).map((_, index) => (
							<CarouselItem key={`placeholder-${index}`}>
								<ImagePlaceholder size={size} />
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>

				<Modal open={!!modalImage} onOpenChange={(open) => !open && setModalImage(null)}>
					<ModalContent>
						<ModalHeader>
							<ModalTitle>{modalImage?.name}</ModalTitle>
						</ModalHeader>
						{modalImage && <img src={modalImage.url} alt={modalImage.name} />}
					</ModalContent>
				</Modal>
			</div>
		);
	}
);

Gallery.displayName = "Gallery";
