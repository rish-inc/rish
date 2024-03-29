import { defineConfig } from "vite";
import liveReload from 'vite-plugin-live-reload';
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import postcssNesting from "postcss-nesting";
import sassGlobImports from 'vite-plugin-sass-glob-import';
import webfontDownload from 'vite-plugin-webfont-dl';
import glob from "glob";
import path from "path";
import fs from "fs";

const themePath = '/wp/wp-content/themes/rdone2020';
const assets = process.env.NODE_ENV === 'development' ? '/' : '/dist/';

export default defineConfig ( {
	plugins: [
		liveReload( __dirname + '/**/*.php' ),
		webfontDownload([
			'https://fonts.googleapis.com/css2?family=Meie+Script&family=Vollkorn:ital,wght@0,400;0,600;1,400;1,500&display=swap'
		]),
		sassGlobImports(),
	],
	root: './',
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
				entryFileNames: `assets/[name].js`,
				chunkFileNames: `assets/[name].js`,
				assetFileNames: ( { name } ) => {
					if ( /\.( gif|jpeg|jpg|png|svg|webp|json| )$/.test( name ?? '' ) ) {
						return 'assets/images/[name].[ext]';
					}
					if ( /\.css$/.test( name ?? '' ) ) {
						return 'assets/css/[name].[ext]';
					}
					if ( /\.js$/.test( name ?? '' ) ) {
						return 'assets/js/[name].[ext]';
					}
					return 'assets/[name].[ext]';
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
		preprocessorOptions: {
			scss: {
				additionalData: `$base-dir: unquote('` + themePath + assets + `');`,
			},
		},
		postcss: {
			plugins: [
				postcssNesting,
				tailwindcss,
				autoprefixer,
			],
		},
		devSourcemap: true,
	},
} );
