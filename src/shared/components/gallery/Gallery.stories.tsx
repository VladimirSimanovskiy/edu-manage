import type { Meta, StoryObj } from "@storybook/react";
import { Gallery } from "./Gallery";
import { useState } from "react";
import { Button } from "../button";
import { fileInfoArrayToBase64 } from "@/lib/utils/image/imageConverter";

const meta = {
	component: Gallery,
	parameters: {
		layout: "centered"
	},
	args: {
		size: "sm"
	},
	argTypes: {
		size: {
			control: "select",
			options: ["xs", "sm", "md", "lg", "xl"]
		},
		readonly: {
			control: "boolean"
		}
	},
	tags: ["autodocs"]
} satisfies Meta<typeof Gallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => {
		const GalleryWithUpload = () => {
			const [images, setImages] = useState<Array<{ id: number; url: string; name: string }>>([]);
			return <Gallery {...args} values={images} onValueChange={setImages} className="w-[500px]" />;
		};

		return <GalleryWithUpload />;
	}
};

export const GallerySubmit: Story = {
	render: function GalleryWithSubmit(args) {
		const [images, setImages] = useState<Array<{ id: number; url: string; name: string }>>([
			{
				id: 1,
				name: "first.img",
				url: "https://placehold.co/200x200/png"
			}
		]);

		const handleSubmit = async () => {
			const dataToSend = await fileInfoArrayToBase64(images);
			alert(JSON.stringify(dataToSend, null, 2));
		};

		return (
			<div className="space-y-4">
				<Gallery {...args} values={images} onValueChange={setImages} className="w-[500px]" />
				<Button onClick={handleSubmit}>Отправить</Button>
			</div>
		);
	}
};
