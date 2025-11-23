import React, { createContext, useContext, ReactNode } from "react";

interface ToolbarContextValue {
	focus: "high" | "low";
}

const ToolbarContext = createContext<ToolbarContextValue | undefined>(undefined);

export interface ToolbarProviderProps {
	children: ReactNode;
	focus?: "high" | "low";
}

export const ToolbarProvider: React.FC<ToolbarProviderProps> = ({ children, focus = "high" }) => {
	return <ToolbarContext.Provider value={{ focus }}>{children}</ToolbarContext.Provider>;
};

export const useToolbarContext = (): ToolbarContextValue => {
	const context = useContext(ToolbarContext);

	if (context === undefined) {
		throw new Error("useToolbarContext должен использоваться внутри ToolbarProvider");
	}

	return context;
};
