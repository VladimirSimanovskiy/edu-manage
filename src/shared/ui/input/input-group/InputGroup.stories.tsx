import { Icon } from "@/components/icon/Icon";
import type { Meta, StoryObj } from "@storybook/react";
import { Circle, Mail } from "lucide-react";
import Input from "../input/Input";
import TextInput from "../text-input/TextInput";
import { InputGroup, InputGroupButton, InputGroupInput, InputGroupText } from "./InputGroup";

const meta: Meta<typeof InputGroup> = {
	component: InputGroup,
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div style={{ width: "400px" }}>
				<Story />
			</div>
		)
	],
	parameters: {
		layout: "centered"
	}
};

export default meta;
type Story = StoryObj<typeof InputGroup>;

export const Default: Story = {
	render: () => (
		<InputGroup>
			<InputGroupText>@</InputGroupText>
			<InputGroupInput placeholder="Username" />
		</InputGroup>
	)
};

export const Playground: Story = {
	render: () => {
		return (
			<div className="flex flex-col gap-2">
				<div className="flex flex-col gap-2">
					<h3>Простой инпут</h3>
					<InputGroup>
						<InputGroupInput placeholder="Username" />
					</InputGroup>
					<h3>С префиксом и суффиксом</h3>
					<InputGroup>
						<InputGroupText>https://</InputGroupText>
						<InputGroupInput placeholder="URL" />
						<InputGroupText>.com</InputGroupText>
					</InputGroup>
					<h3>С кнопками</h3>
					<InputGroup>
						<InputGroupButton icon={Circle} onClick={() => alert("clicked")} />
						<InputGroupInput placeholder="Brand" />
						<InputGroupButton icon={Circle} onClick={() => alert("clicked")} />
					</InputGroup>
					<h3>С соседними текстовыми блоками</h3>
					<InputGroup>
						<InputGroupText>
							<Icon icon={Mail} />
						</InputGroupText>
						<InputGroupText>Mail: </InputGroupText>
						<InputGroupInput placeholder="Username" />
						<InputGroupText>@</InputGroupText>
						<InputGroupText>.com</InputGroupText>
					</InputGroup>
					<h3>С несколькими input</h3>
					<InputGroup>
						<InputGroupText>
							<Icon icon={Mail} />
						</InputGroupText>
						<InputGroupInput placeholder="Username" />
						<InputGroupText>@</InputGroupText>
						<InputGroupInput placeholder="Domain" />
						<InputGroupText>.com</InputGroupText>
					</InputGroup>
					<h3>Disabled</h3>
					<InputGroup>
						<InputGroupText>https://</InputGroupText>
						<InputGroupInput placeholder="URL" disabled />
						<InputGroupText>.com</InputGroupText>
					</InputGroup>
					<h3>Readonly</h3>
					<InputGroup>
						<InputGroupText>https://</InputGroupText>
						<InputGroupInput placeholder="URL" readOnly />
						<InputGroupText>.com</InputGroupText>
					</InputGroup>
					<h3>Error</h3>
					<InputGroup>
						<InputGroupText>https://</InputGroupText>
						<InputGroupInput placeholder="URL" error="Error" />
						<InputGroupText>.com</InputGroupText>
					</InputGroup>
					<InputGroup>
						<InputGroupText>https://</InputGroupText>
						<InputGroupInput placeholder="URL" minLength={10} type="text" />
						<InputGroupText>.com</InputGroupText>
					</InputGroup>
				</div>
				<div>
					<Input placeholder="Username" error="Error" />
				</div>
				<div>
					<TextInput placeholder="Username" error="Error" />
				</div>
			</div>
		);
	}
};
