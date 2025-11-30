import * as React from "react";
import { tv } from "tailwind-variants";

const scrollShadowContainerStyles = tv({
	base: "relative overflow-hidden",
	slots: {
		shadow: "pointer-events-none absolute left-0 right-0 z-10 h-[10px]",
		topShadow: "top-0 bg-gradient-to-b from-shadow-scroll to-transparent opacity-5",
		bottomShadow: "bottom-0 bg-gradient-to-t from-shadow-scroll to-transparent opacity-5",
		content: "h-full w-full overflow-auto"
	}
});

export interface ScrollShadowContainerProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	wrapperClassName?: string;
	shadowTopClassName?: string;
	shadowBottomClassName?: string;
}

export const ScrollShadowContainer = React.forwardRef<HTMLDivElement, ScrollShadowContainerProps>(
	({ className, children, shadowTopClassName, shadowBottomClassName, wrapperClassName, ...props }, ref) => {
		const containerRef = React.useRef<HTMLDivElement>(null);
		const [showTopShadow, setShowTopShadow] = React.useState(false);
		const [showBottomShadow, setShowBottomShadow] = React.useState(false);

		const { base, shadow, topShadow, bottomShadow, content } = scrollShadowContainerStyles();

		React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

		// Функция проверки скролла для отображения теней
		const checkScroll = React.useCallback(() => {
			if (!containerRef.current) return;

			const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

			// Показываем верхнюю тень только если прокрутили вниз
			setShowTopShadow(scrollTop > 0);

			// Показываем нижнюю тень только если не докрутили до конца
			setShowBottomShadow(scrollTop < scrollHeight - clientHeight - 1);
		}, []);

		React.useEffect(() => {
			const container = containerRef.current;
			if (!container) return;
			checkScroll();
			container.addEventListener("scroll", checkScroll);
			return () => {
				container.removeEventListener("scroll", checkScroll);
			};
		}, [checkScroll]);

		return (
			<div className={base({ className: wrapperClassName })} {...props}>
				{showTopShadow && (
					<div className={shadow({ className: topShadow({ className: shadowTopClassName }) })} />
				)}

				<div ref={containerRef} className={content({ className })}>
					{children}
				</div>

				{showBottomShadow && (
					<div className={shadow({ className: bottomShadow({ className: shadowBottomClassName }) })} />
				)}
			</div>
		);
	}
);

ScrollShadowContainer.displayName = "ScrollShadowContainer";
