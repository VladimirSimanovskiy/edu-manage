import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
	stories: [
		{
			directory: "../src/shared/ui",
			files: "**/*.stories.@(js|jsx|mjs|ts|tsx)",
			titlePrefix: "Components"
		}
	],
	addons: [],
	framework: {
		name: "@storybook/react-vite",
		options: {}
	},
	viteFinal: async (config) => {
		config.assetsInclude = config.assetsInclude || [];
		if (Array.isArray(config.assetsInclude)) {
			// Копируем шрифты (Inter/Menlo) для Storybook
			config.assetsInclude.push("**/*.ttf", "**/*.woff", "**/*.woff2");
		}
		return config;
	}
};

export default config;
