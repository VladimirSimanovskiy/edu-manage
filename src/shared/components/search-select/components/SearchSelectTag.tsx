import { TagButton, TagClose, TagDivider, TagWrapper } from "@/components/tag/Tag";
import { useIsMobile } from "@/hooks/useBreakpoints";
import { PropsWithChildren, useMemo } from "react";
import { tv } from "tailwind-variants";

const searchSelectTagStyles = tv({
	base: "rounded-sm",
	variants: {
		selected: {
			true: "group-focus-within/search-select-trigger:shadow-focus"
		}
	}
});
interface SearchSelectTagProps {
	onLabelClick: (e: React.MouseEvent<HTMLElement>) => void;
	onClose: (e: React.MouseEvent<HTMLElement>) => void;
	readonly?: boolean;
	isFocused?: boolean;
}

export const SearchSelectTag = (props: PropsWithChildren<SearchSelectTagProps>) => {
	const { children, onLabelClick, onClose, readonly = false, isFocused: selected = false } = props;
	const hasClose = Boolean(onClose);
	const isMobile = useIsMobile();
	const size = useMemo(() => (isMobile ? "lg" : "md"), [isMobile]);
	const styles = searchSelectTagStyles({ selected });

	return (
		<TagWrapper size={size} className={styles}>
			<TagButton position={hasClose && !readonly ? "left" : undefined} size={size} onClick={onLabelClick} asChild>
				<span>{children}</span>
			</TagButton>

			{!readonly && (
				<>
					<TagDivider />
					<TagClose size={size} onClick={onClose} tag="span" />
				</>
			)}
		</TagWrapper>
	);
};

SearchSelectTag.displayName = "SearchSelectTag";
