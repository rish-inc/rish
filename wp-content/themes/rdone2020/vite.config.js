import { defineConfig } from "vite";
import liveReload from 'vite-plugin-live-reload';
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import postcssNesting from "postcss-nesting";
import sassGlobImports from 'vite-plugin-sass-glob-import';
import glob from "glob";
import path from "path";
import fs from "fs";

export default defineConfig ( {
	plugins: [
		sassGlobImports,
		liveReload( __dirname + '/**/*.php' ),
	],
	root: '',
	base: process.env.NODE_ENV === 'development' ? './' : '/dist/',
	build: {
		outDir: path.resolve( __dirname, './dist' ),
		emptyOutDir: true,
		manifest: true,
		target: 'es2018',
		rollupOptions: {
			input: {
				main: path.resolve( __dirname + '/main.js' )
			},
			output: {
				entryFileNames: `src/[name].js`,
				chunkFileNames: `src/[name].js`,
				assetFileNames: ( { name } ) => {
					if ( /\.( gif|jpeg|jpg|png|svg|webp| )$/.test( name ?? '' ) ) {
						return 'src/images/[name].[ext]';
					}
					if ( /\.css$/.test( name ?? '' ) ) {
						return 'src/css/[name].[ext]';
					}
					if ( /\.js$/.test( name ?? '' ) ) {
						return 'src/js/[name].[ext]';
					}
					return 'src/[name].[ext]';
				}
			},
		},
		assetsInlineLimit: 0,
		minify: false,
		write: true,
	},
	server: {
		cors: true,
		strictPort: true,
		port: 3000,
		https: false,
		hmr: {
			host: 'localhost',
		},
	},
	css: {
		postcss: {
			plugins: [
				postcssNesting,
				tailwindcss,
				autoprefixer,
			],
		},
		devSourcemap: true,
		plugins: [
			sassGlobImports,
		]
	},
} );
