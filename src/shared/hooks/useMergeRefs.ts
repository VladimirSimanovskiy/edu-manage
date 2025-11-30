import { useCallback } from "react";

type ReactRef<T> = React.RefCallback<T> | React.RefObject<T> | null;

function assignRef<T>(ref: ReactRef<T>, value: T | null) {
	if (typeof ref === "function") {
		ref(value);
	} else if (ref !== null && "current" in ref) {
		(ref as React.MutableRefObject<T | null>).current = value;
	}
}

export function useMergeRefs<T>(...refs: ReactRef<T>[]) {
	return useCallback(
		(value: T | null) => {
			refs.forEach((ref) => {
				assignRef(ref, value);
			});
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[...refs]
	);
}


