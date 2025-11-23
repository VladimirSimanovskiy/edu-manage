import { Dot } from "lucide-react";
import React from "react";

export const InputOTPSeparator = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
	({ ...props }, ref) => (
		<div ref={ref} role="separator" {...props}>
			<Dot />
		</div>
	)
);
InputOTPSeparator.displayName = "InputOTPSeparator";
