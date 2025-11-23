import { tv } from "tailwind-variants";
import { usePageStateContext } from "../context/PageStateContext";
import { BoxSvg } from "@/components/images/BoxSvg";
import { LucideIcon } from "lucide-react";
import { PageStateFeatureIcon } from "./PageStateFeatureIcon";

const pageStateBoxSvgStyles = tv({
	base: "relative",
	slots: {
		icon: "absolute",
		svg: "h-[178px] w-[220px]"
	},
	variants: {
		size: {
			sm: {
				svg: "h-[124px] w-[164px]",
				icon: "bottom-2 right-14"
			},
			md: {
				svg: "h-[140px] w-[168px]",
				icon: "bottom-2.5 right-[3.625rem]"
			},
			lg: {
				icon: "bottom-4 right-20"
			}
		}
	}
});

interface PageStateBoxSvgProps {
	icon?: LucideIcon;
}

export const PageStateBoxSvg: React.FC<PageStateBoxSvgProps> = ({ icon }) => {
	const { size } = usePageStateContext();
	const styles = pageStateBoxSvgStyles({ size });

	return (
		<div className={styles.base()}>
			<BoxSvg className={styles.svg()} />
			{icon && <PageStateFeatureIcon className={styles.icon()} icon={icon} />}
		</div>
	);
};

PageStateBoxSvg.displayName = "PageStateBoxSvg";
