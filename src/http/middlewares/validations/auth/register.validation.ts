import { z } from "zod"

export type RegisterDto = {
	name: string
	email: string
	password: string
}

export const RegisterSchema = z
	.object({
		name: z.string(),
		email: z.string(),
		password: z.string(),
	})
	.strict()
