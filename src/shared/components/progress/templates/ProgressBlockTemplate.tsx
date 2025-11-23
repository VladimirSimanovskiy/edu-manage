import { LucideIcon, RefreshCw, X } from "lucide-react";
import { tv } from "tailwind-variants";
import { Progress } from "../Progress";
import { ProgressIconButton } from "../components/progress-icon-button/ProgressIconButton";
import { ProgressIcon } from "../components/progress-icon/ProgressIcon";
import { ProgressText } from "../components/progress-text/ProgressText";
import { VariantsConfig } from "@/lib/utils/variants";
import { ProgressBarSizeVariants } from "../ProgressBarStyles";

const progressBlockTemplateStyles = tv({
	slots: {
		wrap: "flex w-full flex-col",
		header: "flex items-center gap-2",
		retryIcon: ""
	},
	variants: {
		size: {
			sm: {
				wrap: "gap-1",
				retryIcon: "h-3 w-3"
			},
			md: {
				wrap: "gap-1",
				retryIcon: "h-3 w-3"
			},
			lg: {
				wrap: "gap-1.5",
				retryIcon: "h-4 w-4"
			}
		}
	} satisfies VariantsConfig<ProgressBarSizeVariants>,
	defaultVariants: {
		size: "md"
	}
});

export type ProgressBlockTemplateProps = ProgressBarSizeVariants & {
	value?: number;
	max?: number;
	indeterminate?: boolean;
	icon?: LucideIcon;
	title?: React.ReactNode;
	description?: React.ReactNode;
	onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
	onRetry?: (e: React.MouseEvent<HTMLElement>) => void;
};

export const ProgressBlockTemplate = (props: ProgressBlockTemplateProps) => {
	const { size, value, max, indeterminate, icon, title, description, onCancel, onRetry } = props;

	const styles = progressBlockTemplateStyles({ size });

	return (
		<div className={styles.wrap()}>
			<div className={styles.header()}>
				{icon && <ProgressIcon size={size} icon={icon} />}
				{title && (
					<ProgressText size={size} className="mr-auto">
						{title}
					</ProgressText>
				)}
				{description && <ProgressText size={size}>{description}</ProgressText>}
				{onRetry && (
					<ProgressIconButton
						size={size}
						icon={RefreshCw}
						onClick={onRetry}
						iconClassName={styles.retryIcon()}
					/>
				)}
				{onCancel && <ProgressIconButton size={size} icon={X} onClick={onCancel} />}
			</div>
			<div>
				<Progress value={value} max={max} indeterminate={indeterminate} size={size} />
			</div>
		</div>
	);
};

ProgressBlockTemplate.displayName = "ProgressBlockTemplate";
