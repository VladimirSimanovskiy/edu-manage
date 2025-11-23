import { useCallback, useRef, useState } from "react";
import { isElementOverflowing } from "../../lib/utils/dom";

export const useOverflowTooltip = <T extends HTMLElement>() => {
	const [open, setOpen] = useState(false);
	const ref = useRef<T>(null);

	const onOpenChange = useCallback((newOpen: boolean) => {
		if (newOpen === false) {
			setOpen(false);
			return;
		}
		if (!ref.current) return;
		if (isElementOverflowing(ref.current)) {
			setOpen(true);
		}
	}, []);

	return { open, onOpenChange, ref };
};
