import React from "react";
import { tv } from "tailwind-variants";

const inputOTPGroupStyles = tv({
	base: "flex items-center"
});

export const InputOTPGroup = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
	({ className, ...props }, ref) => <div ref={ref} className={inputOTPGroupStyles({ className })} {...props} />
);

InputOTPGroup.displayName = "InputOTPGroup";
