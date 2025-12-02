import { ButtonBase } from "../button";
import { HeaderLogo } from "./header-logo/HeaderLogo";

export type HeaderNavItemId = string;

export type HeaderNavItem = {
	id: HeaderNavItemId;
	label: string;
	href?: string;
};

export type HeaderProps = {
	/**
	 * Элементы навигации в header.
	 */
	navItems: HeaderNavItem[] | readonly HeaderNavItem[];
	/**
	 * Id активного элемента навигации.
	 */
	activeItemId?: HeaderNavItemId;
	/**
	 * Коллбек выбора пункта навигации.
	 */
	onNavItemClick: (id: HeaderNavItemId) => void;
};

export function Header({ navItems, activeItemId, onNavItemClick }: HeaderProps) {
	return (
		<header className="sticky top-0 z-20 border-b border-secondary-border bg-primary-bg">
			<div className="flex h-14 items-center justify-between px-8">
				<div className="flex h-full flex-1 items-center gap-8">
					<HeaderLogo />

					{navItems.length > 0 && (
						<nav aria-label="Основная навигация приложения" className="h-full">
							<ul className="flex h-full items-stretch gap-2 text-sm">
								{navItems.map((item) => {
									const isActive = item.id === activeItemId;

									return (
										<li key={item.id} className="flex items-stretch">
											<ButtonBase
												variant="text"
												size="md"
												onClick={() => onNavItemClick(item.id)}
												aria-pressed={isActive}
												className={`h-full rounded-none border-b-2 px-3 font-medium ${
													isActive
														? "text--primary-fg border-primary"
														: "border-transparent text-muted hover:text-primary-fg"
												}`}
											>
												{item.label}
											</ButtonBase>
										</li>
									);
								})}
							</ul>
						</nav>
					)}
				</div>
			</div>
		</header>
	);
}
