import { z } from "zod"

export type LoginDto = {
	email: string
	password: string
}

export const LoginSchema = z
	.object({
		email: z.string(),
		password: z.string(),
	})
	.strict()
