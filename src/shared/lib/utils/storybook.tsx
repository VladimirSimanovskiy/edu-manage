import type { CSSProperties, JSX } from "react";
import type { Decorator } from "@storybook/react";
import { cn } from "../utils";

export const resizeDecorator =
	(wrapperStyle?: CSSProperties): Decorator =>
	(Story) => {
		const style = {
			minHeight: "100px",
			minWidth: "100px",
			...(wrapperStyle ?? {}),
			resize: "both" as const,
			overflow: "auto"
		};

		return (
			<div className="h-[2000px]">
				<div className="m-2 mb-10 border p-2" style={style}>
					<Story />
				</div>
			</div>
		);
	};

export const withFixedWidth =
	(width: string, className?: string): Decorator =>
	(Story, context) => (
		<div style={{ width }} className={className}>
			<Story {...context.args} />
		</div>
	);

export const withMaxWidth =
	(width: string, className?: string): Decorator =>
	(Story, context) => (
		<div style={{ maxWidth: width }} className={cn("w-[calc(100vw-2rem)]", className)}>
			<Story {...context.args} />
		</div>
	);

export const storyDecorator =
	(className?: string): Decorator =>
	(Story, context) => (
		<div className={cn("w-[calc(100vw-2rem)]", className)}>
			<Story {...context.args} />
		</div>
	);

export type CustomStory = {
	render: (args: Record<string, unknown>) => JSX.Element;
	parameters?: {
		docs?: {
			description?: {
				story?: string;
			};
		};
	};
};
