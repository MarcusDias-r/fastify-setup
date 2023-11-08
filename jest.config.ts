/* import { pathsToModuleNameMapper } from "ts-jest"
import { compilerOptions } from "./tsconfig.json" */
import type { JestConfigWithTsJest } from "ts-jest"

/** @type {import('ts-jest').JestConfigWithTsJest} */
const jestConfig: JestConfigWithTsJest = {
	preset: "ts-jest",
	testEnvironment: "node",
	testMatch: ["**/tests/**/*.test.ts", "**/tests/**/*.spec.ts"],
	testPathIgnorePatterns: ["./node_modules/"],
	collectCoverage: true,
	coverageDirectory: "coverage",
	coverageProvider: "v8",
	coveragePathIgnorePatterns: [
		"/node_modules/",
		"src/config",
		"src/factories",
		"src/helpers",
		"src/http/app.ts",
		"src/index.ts",
	],
	collectCoverageFrom: ["<rootDir>/src/**/*"],
	moduleNameMapper: {
		"@/(.*)$": "<rootDir>/src/$1",
	},
}

export default jestConfig
