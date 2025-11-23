import type { Meta, StoryObj } from "@storybook/react";
import { FileInput, type FileValue, type FileInfo } from "./FileInput";
import { useState } from "react";
import { CustomStory } from "@/lib/utils/storybook";

const meta: Meta<typeof FileInput> = {
	component: FileInput,
	parameters: {
		layout: "centered"
	},
	tags: ["autodocs"],
	argTypes: {
		showClearIcon: {
			control: "boolean"
		},
		disabled: {
			control: "boolean"
		},
		placeholder: {
			control: "text"
		},
		chooseButtonText: {
			control: "text"
		},
		accept: {
			control: "text",
			description: "Ограничения на типы файлов, стандартный атрибут input. Например: `image/*`"
		},
		error: {
			control: "text"
		},
		value: {
			description: "Текущий файл для controlled режима",
			control: "object"
		},
		defaultValue: {
			description: "Файл по умолчанию для uncontrolled режима",
			control: "object"
		}
	}
};

export default meta;
type Story = StoryObj<typeof FileInput>;

export const Default: Story = {
	args: {
		onChange: (file: FileValue) => {
			console.log(file);
		}
	}
};

export const ImageOnly: Story = {
	args: {
		placeholder: "Выберите изображение",
		chooseButtonText: "Выбрать изображение",
		accept: "image/*",
		showClearIcon: true
	}
};

export const Disabled: Story = {
	args: {
		placeholder: "Файл не выбран",
		chooseButtonText: "Choose file",
		disabled: true,
		showClearIcon: true
	}
};

export const Controlled: CustomStory = {
	render: function ControlledExample() {
		const [selectedFile, setSelectedFile] = useState<FileValue>(null);

		const handleFileChange = (file: FileValue) => {
			setSelectedFile(file);
		};

		const getFileInfo = (file: FileValue) => {
			if (!file) return null;

			if (file instanceof File) {
				return {
					name: file.name,
					size: file.size,
					type: file.type
				};
			}

			return {
				name: file.name,
				size: file.size,
				type: file.type,
				url: file.url
			};
		};

		const fileInfo = getFileInfo(selectedFile);

		return (
			<div className="space-y-4">
				<FileInput
					placeholder="Выберите файл"
					chooseButtonText="Выбрать файл"
					value={selectedFile}
					onChange={handleFileChange}
				/>
				{fileInfo && (
					<div className="space-y-1 text-sm text-secondary-fg">
						<div>Выбранный файл: {fileInfo.name}</div>
						{fileInfo.size && <div>Размер: {fileInfo.size} байт</div>}
						{fileInfo.type && <div>Тип: {fileInfo.type}</div>}
						{fileInfo.url && <div>URL: {fileInfo.url}</div>}
					</div>
				)}
			</div>
		);
	}
};

export const WithDefaultValue: CustomStory = {
	render: function UncontrolledExample() {
		const defaultFileInfo: FileInfo = {
			id: 1,
			name: "document.pdf",
			size: 1024 * 1024,
			type: "application/pdf",
			url: "https://example.com/document.pdf"
		};

		return (
			<div className="space-y-4">
				<FileInput defaultValue={defaultFileInfo} />
				<div className="text-sm text-secondary-fg">
					Этот пример использует defaultValue с предустановленным файлом
				</div>
			</div>
		);
	}
};

export const WithFileInfo: CustomStory = {
	render: function FileInfoExample() {
		const [selectedFile, setSelectedFile] = useState<FileValue>({
			id: 1,
			name: "uploaded-image.png",
			size: 2048 * 1024,
			type: "image/png",
			url: "https://placehold.co/600x400"
		});

		return (
			<div className="space-y-4">
				<FileInput value={selectedFile} onChange={setSelectedFile} />
				<div className="text-sm text-secondary-fg">
					Этот пример показывает работу с FileInfo объектом вместо браузерного File
				</div>
			</div>
		);
	}
};
