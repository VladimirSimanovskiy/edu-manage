export type ClassValue = string | false | null | undefined;

/**
 * Простейший helper для объединения className.
 * Нам достаточно его поведения для storybook-декораторов.
 */
export function cn(...inputs: ClassValue[]) {
	return inputs.filter(Boolean).join(" ");
}


