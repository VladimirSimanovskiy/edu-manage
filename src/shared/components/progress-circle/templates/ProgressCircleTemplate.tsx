import { tv } from "tailwind-variants";
import { ProgressCircle } from "../ProgressCircle";
import { ProgressCircleDescription } from "../components/progress-circle-description/ProgressCircleDescription";
import { ProgressCircleTitle } from "../components/progress-circle-text/ProgressCircleTitle";
import { ProgressCircleIconButton } from "../components/progress-circle-icon-button/ProgressCircleIconButton";
import { RefreshCw } from "lucide-react";

const progressCircleTemplateStyles = tv({
	slots: {
		wrap: "relative w-fit",
		header: "absolute inset-0 z-10 flex flex-col items-center justify-center"
	}
});

export type ProgressCircleTemplateProps = {
	size?: "xs" | "sm" | "md" | "lg" | "xl";
	value?: number;
	max?: number;
	indeterminate?: boolean;
	description?: React.ReactNode;
	title?: React.ReactNode;
	onRetry?: (e: React.MouseEvent<HTMLElement>) => void;
};

export const ProgressCircleTemplate = (props: ProgressCircleTemplateProps) => {
	const { size, value, max, indeterminate, description, title, onRetry } = props;
	const shouldShowDescription = description && !["xs", "sm"].includes(size as string);
	const styles = progressCircleTemplateStyles({ size });

	return (
		<div className={styles.wrap()}>
			<ProgressCircle value={value} max={max} indeterminate={indeterminate} size={size} />
			<div className={styles.header()}>
				{title && <ProgressCircleTitle size={size}>{title}</ProgressCircleTitle>}
				{onRetry && <ProgressCircleIconButton size={size} icon={RefreshCw} onClick={onRetry} />}
				{shouldShowDescription && <ProgressCircleDescription>{description}</ProgressCircleDescription>}
			</div>
		</div>
	);
};

ProgressCircleTemplate.displayName = "ProgressCircleTemplate";
