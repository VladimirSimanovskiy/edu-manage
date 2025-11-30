import { Meta, StoryContext, StoryFn, StoryObj } from "@storybook/react";
import { CircleAlert, RefreshCw } from "lucide-react";
import { Icon } from "../icon/Icon";
import { customToast, CustomToastProps, dismiss, toast, Toaster } from "./Toast";
import { ToastStory } from "./ToastStory";
import { Button } from "../button/button/Button";
import Toast from "./ToastView";
import { ToastAction } from "./components/toast-action/ToastAction";
import { Loader } from "../loader";
import { useCallback, useMemo, useState } from "react";

const toastDecorator = (_: StoryFn, context: StoryContext) => {
	return (
		<>
			<div className="flex min-h-80 min-w-80 items-center justify-center">
				<Button onClick={() => toast(context.args.title as string, { ...context.args })}>Show Toast</Button>
			</div>
			<Toaster />
		</>
	);
};

const meta: Meta<typeof ToastStory> = {
	component: ToastStory,
	parameters: {
		layout: "centered"
	},
	args: {
		title: "Save completed"
	},
	tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof ToastStory>;

export const Default: Story = {
	decorators: [toastDecorator]
};

export const FullExample: Story = {
	decorators: [toastDecorator],
	args: {
		title: "Save completed",
		description: "Your data has been saved successfully",
		duration: 4000,
		position: "bottom-center",
		focus: "medium",
		size: "lg",
		status: "success",
		icon: <Icon icon={CircleAlert} />,
		closeAction: true,
		dismissible: true,
		onAutoClose: () => console.log("Auto close"),
		onDismiss: () => console.log("Dismiss"),
		primaryAction: {
			title: "Undo",
			onClick: () => console.log("Undo")
		},
		secondaryAction: {
			title: "Learn more",
			onClick: () => console.log("Learn more")
		}
	}
};

export const ControlledDismiss: Story = {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	render: function ControlledDismiss(_) {
		const [toastId, setToastId] = useState<string | number>();

		return (
			<div className="flex min-h-80 min-w-80 flex-col items-center justify-center gap-4">
				<Button onClick={() => setToastId(toast("Save completed", { duration: Infinity }))}>
					Показать уведомление
				</Button>
				<Button onClick={() => dismiss(toastId)}>Закрыть последнее уведомление</Button>
				<Button onClick={() => toast("Save completed", { duration: Infinity, id: "SOME_TOAST_ID" })}>
					Показать уведомление с id
				</Button>
				<Button onClick={() => dismiss("SOME_TOAST_ID")}>Закрыть уведомление по id</Button>

				<Toaster />
			</div>
		);
	}
};

const appUpdateToast = () => {
	return customToast(({ id, toast }) => <AppUpdateComponent id={id} toast={toast} />, {
		duration: Infinity
	});
};

const appUpdateMock = () => {
	return new Promise((resolve) => setTimeout(() => resolve(true), 3000));
};

const AppUpdateComponent: React.FC<CustomToastProps> = ({ id, toast }) => {
	const [state, setState] = useState<"initial" | "loading" | "success">("initial");

	const startUpdate = () => {
		setState("loading");
		appUpdateMock().then(() => setState("success"));
	};

	const closeHandler = useCallback(() => toast.dismiss(id), [id, toast]);

	const commonToastProps = useMemo(
		() => ({
			status: "default" as const,
			size: "sm" as const,
			focus: "medium" as const,
			closeAction: true,
			onClose: closeHandler
		}),
		[closeHandler]
	);

	if (state === "initial") {
		return (
			<Toast
				title="Доступна новая версия"
				{...commonToastProps}
				primaryAction={
					<ToastAction onClick={startUpdate}>
						<Icon icon={RefreshCw} />
					</ToastAction>
				}
			/>
		);
	}

	if (state === "loading") {
		return (
			<Toast
				title={<span className="text-muted">Обновление...</span>}
				{...commonToastProps}
				primaryAction={<Loader size="md" />}
			/>
		);
	}

	return <Toast title="Успешно обновлено!" {...commonToastProps} status="success" />;
};

export const MultiStateToast: Story = {
	render: () => {
		return (
			<div className="flex min-h-80 w-full items-center justify-center">
				<Button onClick={() => appUpdateToast()}>Показать обновление</Button>
				<Toaster />
			</div>
		);
	},
	parameters: {
		layout: "fullscreen"
	}
};
