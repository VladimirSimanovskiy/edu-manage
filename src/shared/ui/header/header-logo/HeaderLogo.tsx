import type { FC } from "react";

export type HeaderLogoProps = {
	/**
	 * Ссылка, на которую ведёт клик по логотипу.
	 * По умолчанию — корень приложения.
	 */
	href?: string;
};

export const HeaderLogo: FC<HeaderLogoProps> = ({ href = "/" }) => {
	return (
		<a href={href} className="flex items-center gap-2.5" aria-label="Ритм — на главную">
			<div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
				<svg viewBox="0 0 32 32" aria-hidden="true" className="h-9 w-9">
					<circle
						cx="16"
						cy="16"
						r="11"
						stroke="currentColor"
						strokeWidth={1.4}
						strokeOpacity={0.35}
						fill="currentColor"
						fillOpacity={0.08}
					/>
					<path
						d="M5 18 C7 14 9 14 11 18 C13 22 15 22 17 18 C19 14 21 14 23 18 C24.5 20.5 26 20.5 27 19"
						fill="none"
						stroke="currentColor"
						strokeWidth={1.9}
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<circle cx="11" cy="18" r={1} fill="currentColor" />
					<circle cx="17" cy="18" r={1} fill="currentColor" />
					<circle cx="23" cy="18" r={1} fill="currentColor" />
				</svg>
			</div>

			<div className="flex flex-col leading-none">
				<span className="text-lg font-semibold tracking-tight">Ритм</span>
			</div>
		</a>
	);
};
