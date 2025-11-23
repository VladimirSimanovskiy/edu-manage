import * as React from "react";
import { OTPInput } from "input-otp";
import { tv } from "tailwind-variants";

const inputOTPStyles = tv({
	slots: {
		container: "flex items-center gap-2 has-[:disabled]:opacity-50",
		input: "disabled:cursor-not-allowed"
	}
});

export const InputOTP = React.forwardRef<
	React.ElementRef<typeof OTPInput>,
	React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => {
	const styles = inputOTPStyles();

	return (
		<OTPInput
			ref={ref}
			containerClassName={styles.container({ className: containerClassName })}
			className={styles.input({ className })}
			{...props}
		/>
	);
});

InputOTP.displayName = "InputOTP";
