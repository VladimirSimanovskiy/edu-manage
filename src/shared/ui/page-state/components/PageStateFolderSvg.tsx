import { tv } from "tailwind-variants";
import { PageStateVariants, usePageStateContext } from "../context/PageStateContext";
import { FolderSvg } from "@/components/images/FolderSvg";
import { PageStateFeatureIcon } from "./PageStateFeatureIcon";
import { LucideIcon } from "lucide-react";
import { VariantsConfig } from "@/lib/utils/variants";

const pageStateFolderSvgStyles = tv({
	base: "relative flex items-center justify-center",
	slots: {
		icon: "absolute",
		svg: "h-[160px] w-[220px]"
	},
	variants: {
		size: {
			sm: {
				svg: "h-[110px] w-[164px]",
				icon: "bottom-0 right-[3.625rem]"
			},
			md: {
				svg: "h-[128px] w-[168px]",
				icon: "bottom-2 right-[3.625rem]"
			},
			lg: {
				icon: "bottom-4 right-[5.125rem]"
			}
		}
	} satisfies VariantsConfig<PageStateVariants>
});

interface PageStateFolderSvgProps extends PageStateVariants {
	icon?: LucideIcon;
}

export const PageStateFolderSvg: React.FC<PageStateFolderSvgProps> = ({ icon, size: sizeProp }) => {
	const { size } = usePageStateContext();
	const styles = pageStateFolderSvgStyles({ size: sizeProp || size });

	return (
		<div className={styles.base()}>
			<FolderSvg className={styles.svg()} />
			{icon && <PageStateFeatureIcon className={styles.icon()} icon={icon} />}
		</div>
	);
};

PageStateFolderSvg.displayName = "PageStateFolderSvg";
