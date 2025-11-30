import { tv } from "tailwind-variants";

const drawerHandlerSvgStyles = tv({
	base: "fill-secondary-bg",
	slots: {
		handler: "fill-primary-border"
	}
});

export const DrawerHandlerSvg = () => {
	const styles = drawerHandlerSvgStyles();

	return (
		<svg className={styles.base()} xmlns="http://www.w3.org/2000/svg" width="80" height="12" viewBox="0 0 80 12">
			<path d="M-0.5 12H22C19.1257 12 16.1864 10.9008 14.7634 8.71571L11.389 3.53429C9.96593 1.34918 7.31256 0 4.43829 0H-0.5V12Z" />
			<path d="M59 12H80.5V0H76.5562C73.6819 0 71.0285 1.34918 69.6055 3.53429L66.2311 8.71571C64.808 10.9008 61.8743 12 59 12Z" />
			<path
				className={styles.handler()}
				d="M27 0C25.067 0 23.5 1.37113 23.5 3.0625C23.5 4.75387 25.067 6.125 27 6.125H54C55.933 6.125 57.5 4.75387 57.5 3.0625C57.5 1.37113 55.933 0 54 0H27Z"
			/>
		</svg>
	);
};
