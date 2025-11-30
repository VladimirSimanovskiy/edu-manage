import React, { createContext, useContext } from "react";

export type PageStateSize = "sm" | "md" | "lg";

export interface PageStateVariants {
	size?: PageStateSize;
}

const PageStateContext = createContext<PageStateVariants | undefined>(undefined);

interface PageStateProviderProps {
	size: PageStateSize;
	children: React.ReactNode;
}

export const PageStateProvider: React.FC<PageStateProviderProps> = ({ size, children }) => {
	return <PageStateContext.Provider value={{ size }}>{children}</PageStateContext.Provider>;
};

export const usePageStateContext = (): PageStateVariants => {
	const context = useContext(PageStateContext);
	if (!context) {
		throw new Error("usePageStateContext must be used within a PageStateProvider");
	}
	return context;
};
