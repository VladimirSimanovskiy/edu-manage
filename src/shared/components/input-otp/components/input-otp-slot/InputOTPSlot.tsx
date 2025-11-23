import { OTPInputContext } from "input-otp";
import React from "react";
import { tv } from "tailwind-variants";

const inputOTPSlotStyles = tv({
	slots: {
		container:
			"relative flex h-10 w-10 items-center justify-center border-y border-r border-secondary-border bg-secondary-bg text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
		caretWrapper: "pointer-events-none absolute inset-0 flex items-center justify-center",
		caret: "animate-caret-blink h-4 w-px bg-foreground duration-1000"
	},
	variants: {
		isActive: {
			true: {
				container: "z-10 !shadow-focus"
			}
		}
	}
});

export const InputOTPSlot = React.forwardRef<
	React.ElementRef<"div">,
	React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
	const inputOTPContext = React.useContext(OTPInputContext);
	const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];
	const styles = inputOTPSlotStyles();

	return (
		<div ref={ref} className={styles.container({ isActive, className })} {...props}>
			{char}
			{hasFakeCaret && (
				<div className={styles.caretWrapper()}>
					<div className={styles.caret()} />
				</div>
			)}
		</div>
	);
});
InputOTPSlot.displayName = "InputOTPSlot";
