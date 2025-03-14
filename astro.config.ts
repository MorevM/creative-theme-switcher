import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import svgLoader from 'vite-svg-loader';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://astro.build/config
export default defineConfig({
	devToolbar: { enabled: false },
	site: 'https://morevm.github.io',
	base: '/creative-theme-switcher/',
	server: {
		open: true,
		port: 3000,
	},
	vite: {
		plugins: [
			tsconfigPaths({ loose: true }),
			svgLoader(),
		],
		resolve: {
			alias: [
				{ find: '~components', replacement: fileURLToPath(new URL('./src/components/', import.meta.url)) },
				{ find: '~assets', replacement: fileURLToPath(new URL('./src/assets/', import.meta.url)) },
			],
		},
	},
});
