import { Loader } from "@/components/loader";
import React, { useEffect, useRef } from "react";
import { tv } from "tailwind-variants";

const loadMoreTriggerStyles = tv({
	base: "py-2 text-center text-sm text-muted-foreground"
});

export interface LoadMoreTriggerProps {
	/** Callback, который вызывается когда триггер становится видимым */
	onLoad: () => void;
	/** Есть ли еще элементы для загрузки */
	hasMore: boolean;
	/** Текст индикатора загрузки */
	loadingText?: string;
	/** Дополнительные CSS классы */
	className?: string;
}

/**
 * Компонент для автоматической загрузки дополнительных элементов при прокрутке.
 * Отображает индикатор загрузки и автоматически вызывает `onLoad` когда пользователь
 * доскроллит до этого элемента.
 */
export const LoadMoreTrigger = React.forwardRef<HTMLDivElement, LoadMoreTriggerProps>(
	({ onLoad, hasMore, loadingText = "Загрузка...", className }, ref) => {
		const triggerRef = useRef<HTMLDivElement>(null);
		const styles = loadMoreTriggerStyles({ className });

		React.useImperativeHandle(ref, () => triggerRef.current as HTMLDivElement);

		useEffect(() => {
			const trigger = triggerRef.current;
			if (!trigger || !hasMore) return;

			const observer = new IntersectionObserver(
				([entry]) => {
					if (entry.isIntersecting) {
						onLoad();
					}
				},
				{ rootMargin: "50px" }
			);

			observer.observe(trigger);

			return () => {
				observer.disconnect();
			};
		}, [onLoad, hasMore]);

		if (!hasMore) return null;

		return (
			<div ref={triggerRef} className={styles}>
				<Loader className="flex-row">{loadingText}</Loader>
			</div>
		);
	}
);

LoadMoreTrigger.displayName = "LoadMoreTrigger";
