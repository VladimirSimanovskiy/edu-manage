import * as React from "react";
import { AvatarLabelVariants } from "./AvatarLabel";

export type AvatarLabelComponentType = "avatar" | "indicator" | "title" | "description";

// Тип для дочернего компонента AvatarLabel
export type AvatarLabelChild<T = Record<string, unknown>> = (
	| React.ComponentType<T>
	| React.ForwardRefExoticComponent<T>
) & {
	componentType: AvatarLabelComponentType;
};

export type AvatarLabelContextValue = AvatarLabelVariants;

export const AvatarLabelContext = React.createContext<AvatarLabelContextValue | null>(null);

export const useAvatarLabelContext = () => {
	const context = React.useContext(AvatarLabelContext);
	if (!context) {
		throw new Error("useAvatarLabelContext must be used within AvatarLabelProvider");
	}
	return context;
};
