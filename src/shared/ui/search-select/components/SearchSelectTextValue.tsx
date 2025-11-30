import React from "react";
import { tv } from "tailwind-variants";

const searchSelectTextValueStyles = tv({
	base: "self-center pl-1.5"
});

interface SearchSelectTextValueProps {
	children: React.ReactNode;
	className?: string;
}

export const SearchSelectTextValue: React.FC<SearchSelectTextValueProps> = ({ children, className }) => {
	return <span className={searchSelectTextValueStyles({ className })}>{children}</span>;
};
