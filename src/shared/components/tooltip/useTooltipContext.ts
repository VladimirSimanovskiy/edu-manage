import * as React from "react";

export type TooltipVariants = {
	focus?: "high";
};

export const TooltipContext = React.createContext<TooltipVariants>({});

export const useTooltipContext = () => {
	const context = React.useContext(TooltipContext);
	return context;
};
