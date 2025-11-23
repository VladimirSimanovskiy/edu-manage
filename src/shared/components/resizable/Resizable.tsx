import { GripVertical } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";
import { tv } from "tailwind-variants";
import { Icon } from "../icon";

const resizablePanelGroupStyles = tv({
	base: "flex h-full w-full data-[panel-group-direction=vertical]:flex-col"
});

export const ResizablePanelGroup = ({
	className,
	...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
	<ResizablePrimitive.PanelGroup className={resizablePanelGroupStyles({ className })} {...props} />
);

export const ResizablePanel = ResizablePrimitive.Panel;

const resizableHandleStyles = tv({
	slots: {
		wrapper: [
			"relative flex w-px items-center justify-center bg-secondary-border hover:bg-primary-border",
			"after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2",
			"focus-visible:shadow-focus focus-visible:outline-none",
			"data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90"
		],
		handle: "z-10 flex h-4 w-2.5 items-center justify-center rounded-sm border border-secondary-border bg-secondary-border hover:border-primary-border hover:bg-primary-border",
		icon: "h-2.5 w-2.5"
	}
});

export const ResizableHandle = ({
	withHandle,
	className,
	...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
	withHandle?: boolean;
}) => {
	const styles = resizableHandleStyles();

	return (
		<ResizablePrimitive.PanelResizeHandle className={styles.wrapper({ className })} {...props}>
			{withHandle && (
				<div className={styles.handle()}>
					<Icon icon={GripVertical} className={styles.icon()} />
				</div>
			)}
		</ResizablePrimitive.PanelResizeHandle>
	);
};
