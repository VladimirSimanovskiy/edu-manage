import { LucideIcon, RotateCw, X } from "lucide-react";
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
		header: "flex items-center justify-between gap-2",
		titleWrapper: "flex items-center",
		actionsWrapper: "flex items-center gap-2"
	},
	variants: {
		size: {
			sm: {
				wrap: "gap-1",
				titleWrapper: "gap-1"
			},
			md: {
				wrap: "gap-1",
				titleWrapper: "gap-1.5"
			},
			lg: {
				wrap: "gap-1.5",
				titleWrapper: "gap-2"
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
				<div className={styles.titleWrapper()}>
					{icon && <ProgressIcon size={size} icon={icon} />}
					{title && (
						<ProgressText size={size} className="mr-auto">
							{title}
						</ProgressText>
					)}
				</div>

				<div className={styles.actionsWrapper()}>
					{description && <ProgressText size={size}>{description}</ProgressText>}
					{onRetry && (
						<ProgressIconButton
							size={size}
							icon={RotateCw}
							onClick={onRetry}
							iconClassName="p-0.5 stroke-[2.3px]"
						/>
					)}
					{onCancel && <ProgressIconButton size={size} icon={X} onClick={onCancel} />}
				</div>
			</div>
			<div>
				<Progress value={value} max={max} indeterminate={indeterminate} size={size} />
			</div>
		</div>
	);
};

ProgressBlockTemplate.displayName = "ProgressBlockTemplate";
