import { FileValue } from "@/hooks/use-file-upload/useFileUpload";
import { storyDecorator } from "@/lib/utils/storybook";
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { FileUpload } from "./FileUpload";
import { defaultErrorMessagesRu, FileUploadErrorMessages } from "@/hooks/use-file-upload";

const meta = {
	component: FileUpload,
	tags: ["autodocs"],
	decorators: [storyDecorator("mx-auto max-w-[600px] w-full")]
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
	args: {}
};

export const WithDefaultValues: Story = {
	args: {
		initialFiles: [
			{
				name: "document.pdf",
				size: 528737,
				type: "application/pdf",
				url: "https://example.com/document.pdf",
				id: "document.pdf-1744638436563-8u5xuls"
			},
			{
				name: "intro.zip",
				size: 252873,
				type: "application/zip",
				url: "https://example.com/intro.zip",
				id: "intro.zip-1744638436563-8u5xuls"
			},
			{
				name: "conclusion.xlsx",
				size: 352873,
				type: "application/xlsx",
				url: "https://example.com/conclusion.xlsx",
				id: "conclusion.xlsx-1744638436563-8u5xuls"
			}
		]
	}
};

export const WithConstraints: Story = {
	args: {
		maxFiles: 2,
		maxSize: 1024 * 1024 * 10,
		accept: "image/*",
		multiple: true,
		helpText: "Images only\n∙\nUp to 2 files\n∙\n10MB size"
	}
};

export const Controlled: Story = {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	render: function Controlled(_) {
		const [files, setFiles] = useState<FileValue[]>([
			{
				name: "existing-document.pdf",
				size: 425000,
				type: "application/pdf"
			}
		]);

		const handleAdd = (newFiles: FileValue[]) => {
			console.log("Добавляем файлы:", newFiles);
			setFiles((prev) => [...prev, ...newFiles]);
		};

		const handleRemove = (file: FileValue, index: number) => {
			console.log("Удаляем файл:", file, "по индексу:", index);
			setFiles((prev) => prev.filter((_, i) => i !== index));
		};

		const handleClear = () => {
			console.log("Очищаем все файлы");
			setFiles([]);
		};

		return (
			<div>
				<FileUpload files={files} onAdd={handleAdd} onRemove={handleRemove} onClear={handleClear} />
				<div className="mt-4 rounded-md bg-gray-100 p-4">
					<h4>Состояние файлов ({files.length}):</h4>
					<pre>
						{JSON.stringify(
							files.map((f, index) => ({
								index,
								name: f.name,
								size: f.size,
								type: f.type
							})),
							null,
							2
						)}
					</pre>
				</div>
			</div>
		);
	}
};

export const WithRussianErrorMessages: Story = {
	args: {
		maxSize: 1024 * 1024, // 1MB
		accept: "image/*",
		multiple: true,
		maxFiles: 2,
		errorMessages: defaultErrorMessagesRu
	}
};

export const WithCustomErrorMessages: Story = {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	render: function WithCustomMessages(_) {
		const customMessages: Partial<FileUploadErrorMessages> = {
			fileTooLarge: (fileName, maxSizeBytes) =>
				`Ой! Файл "${fileName}" слишком большой! Максимум: ${Math.round(maxSizeBytes / 1024 / 1024)}МБ`,
			tooManyFiles: (maxFiles) => `Эй, не жадничай! Можно только ${maxFiles} файла`,
			invalidFileType: (fileName) => `Файл "${fileName}" нам не подходит 🤷‍♂️`
		};

		return (
			<FileUpload
				maxSize={2 * 1024 * 1024} // 2MB
				accept=".pdf,.doc,.docx,.xlsx"
				multiple={true}
				maxFiles={2}
				errorMessages={{
					...defaultErrorMessagesRu,
					...customMessages
				}}
			/>
		);
	}
};
