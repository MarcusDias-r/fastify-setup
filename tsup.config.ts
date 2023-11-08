import type { Options } from "tsup"

const env = process.env.NODE_ENV

export const tsup: Options = {
	splitting: true,
	clean: true, // clean up the dist folder
	minify: env === "production",
	bundle: env === "production",
	skipNodeModulesBundle: true,
	entryPoints: ["src/index.ts"],
	outDir: "dist",
	entry: ["src/**/*.ts"],
}
