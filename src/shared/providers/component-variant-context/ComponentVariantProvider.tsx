import React from "react";

interface ComponentVariantContextValue {
	variant?: "inverse";
}

const ComponentVariantContext = React.createContext<ComponentVariantContextValue | undefined>(undefined);

/**
 * Хук для получения информации о вариантах отображения компонентов из контекста.
 */
export const useComponentVariant = () => {
	const context = React.useContext(ComponentVariantContext);
	return context || {};
};

export interface ComponentVariantProviderProps {
	variant?: "inverse";
	children: React.ReactNode;
}

/**
 * Провайдер для управления вариантом отображения компонентов в рамках текущей темы.
 * Позволяет установить вариант внешнего вида для дочерних компонентов.
 */
export const ComponentVariantProvider: React.FC<ComponentVariantProviderProps> = ({ variant, children }) => {
	return <ComponentVariantContext.Provider value={{ variant }}>{children}</ComponentVariantContext.Provider>;
};


