import React from "react";
import { tv } from "tailwind-variants";

const searchSelectPlaceholderStyles = tv({
	base: "pointer-events-none self-center pl-1.5 text-muted"
});

interface SearchSelectPlaceholderProps {
	children: React.ReactNode;
	className?: string;
}

export const SearchSelectPlaceholder: React.FC<SearchSelectPlaceholderProps> = ({ children, className }) => {
	return <span className={searchSelectPlaceholderStyles({ className })}>{children}</span>;
};
