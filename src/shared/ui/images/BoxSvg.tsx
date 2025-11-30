import { tv } from "tailwind-variants";

const boxSvgStyles = tv({
	slots: {
		svg: "h-[178px] w-[220px]",
		circle: "fill-secondary-bg-hover",
		leftSide: "fill-primary-bg-hover",
		rightSide: "[fill:url(#right-size-gradient)] dark:[fill:url(#right-size-gradient-dark)]",
		topSide: "fill-primary-bg dark:fill-primary-border",
		topSideElement: "fill-primary-bg-hover dark:fill-secondary-border",
		stroke: "stroke-primary-border",
		shadowGroup: "[filter:url(#shadow)] dark:[filter:url(#shadow-dark)]"
	}
});

type BoxSvgType = {
	className?: string;
};

export const BoxSvg: React.FC<BoxSvgType> = ({ className }) => {
	const styles = boxSvgStyles();

	return (
		<svg className={styles.svg({ className })} viewBox="0 0 220 178" fill="none" xmlns="http://www.w3.org/2000/svg">
			{/* Декоративные круги на фоне */}
			<circle cx="25" cy="149" r="10" className={styles.circle()} />
			<circle cx="210" cy="57" r="10" className={styles.circle()} />
			<circle cx="198" cy="137" r="6" className={styles.circle()} />
			<circle cx="191" cy="22" r="7" className={styles.circle()} />
			<circle cx="26" cy="31" r="8" className={styles.circle()} />

			{/* Большой фоновый круг */}
			<path
				d="M110 171C154.183 171 190 135.183 190 91C190 46.8172 154.183 11 110 11C65.8172 11 30 46.8172 30 91C30 135.183 65.8172 171 110 171Z"
				className={styles.circle()}
			/>

			{/* Основная 3D коробка с тенью */}
			<g className={styles.shadowGroup()}>
				{/* Левая боковая грань коробки */}
				<path d="M45 31.3513V114.656L109.649 141.963V59.4625L45 31.3513Z" className={styles.leftSide()} />

				{/* Правая боковая грань коробки с градиентом */}
				<path
					d="M174.297 31.3513V114.656L109.649 141.963V59.4625L174.297 31.3513Z"
					className={styles.rightSide()}
				/>

				{/* Верхняя грань коробки */}
				<path
					d="M45 31.3514L109.654 59.47L174.297 31.3514L109.649 4L45 31.3514Z"
					className={styles.topSide()}
				/>

				{/* Обводка коробки */}
				<path
					d="M174.797 114.987L174.492 115.116L109.843 142.423L109.648 142.505L109.454 142.423L44.8057 115.116L44.5 114.987V31.0195L44.8057 30.8906L109.454 3.53906L109.648 3.45703L109.844 3.53906L174.492 30.8906L174.797 31.0195V114.987Z"
					className={styles.stroke()}
				/>

				{/* Декоративный элемент на верхней грани */}
				<path
					d="M71.3584 20.1718L134.758 48.5519L134.762 68.1733L152.224 60.2085L152.23 40.9474L89.0212 12.6978L71.3584 20.1718Z"
					className={styles.topSideElement()}
				/>
			</g>

			{/* Определения для фильтров, градиентов и обрезки */}
			<defs>
				{/* Фильтр для создания тени коробки в светлой теме */}
				<filter
					id="shadow"
					x="26"
					y="0.914307"
					width="167.297"
					height="176.134"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feMorphology radius="6" operator="erode" in="SourceAlpha" result="effect1_dropShadow_25210_736" />
					<feOffset dy="16" />
					<feGaussianBlur stdDeviation="12" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0.0588235 0 0 0 0 0.0901961 0 0 0 0 0.164706 0 0 0 0.12 0"
					/>
					<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_25210_736" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feMorphology radius="6" operator="erode" in="SourceAlpha" result="effect2_dropShadow_25210_736" />
					<feOffset dy="6" />
					<feGaussianBlur stdDeviation="6" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0.0588235 0 0 0 0 0.0901961 0 0 0 0 0.164706 0 0 0 0.12 0"
					/>
					<feBlend mode="normal" in2="effect1_dropShadow_25210_736" result="effect2_dropShadow_25210_736" />
					<feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_25210_736" result="shape" />
				</filter>

				{/* Фильтр для создания тени коробки в темной теме */}
				<filter
					id="shadow-dark"
					x="0"
					y="0.914307"
					width="179.297"
					height="188.134"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="10" />
					<feGaussianBlur stdDeviation="12" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0.00784314 0 0 0 0 0.0235294 0 0 0 0 0.0901961 0 0 0 0.45 0"
					/>
					<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_26498_678" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="3" />
					<feGaussianBlur stdDeviation="2.5" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0.00784314 0 0 0 0 0.0235294 0 0 0 0 0.0901961 0 0 0 0.35 0"
					/>
					<feBlend mode="normal" in2="effect1_dropShadow_26498_678" result="effect2_dropShadow_26498_678" />
					<feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_26498_678" result="shape" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="0.5" />
					<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
					<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.08 0" />
					<feBlend mode="normal" in2="shape" result="effect3_innerShadow_26498_678" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset />
					<feGaussianBlur stdDeviation="0.25" />
					<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
					<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.35 0" />
					<feBlend mode="normal" in2="effect3_innerShadow_26498_678" result="effect4_innerShadow_26498_678" />
				</filter>

				{/* Градиент для правой грани коробки в светлой теме */}
				<linearGradient
					id="right-size-gradient"
					x1="109.649"
					y1="144.486"
					x2="220.297"
					y2="-46.973"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="hsl(var(--primary-bg))" />
					<stop offset="1" stopColor="hsl(var(--primary-bg-hover))" />
				</linearGradient>

				{/* Градиент для правой грани коробки в темной теме */}
				<linearGradient
					id="right-size-gradient-dark"
					x1="0.648716"
					y1="113.486"
					x2="111.297"
					y2="-77.973"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="hsl(var(--secondary-bg-hover))" />
					<stop offset="1" stopColor="hsl(var(--muted))" />
				</linearGradient>
			</defs>
		</svg>
	);
};

BoxSvg.displayName = "BoxSvg";
