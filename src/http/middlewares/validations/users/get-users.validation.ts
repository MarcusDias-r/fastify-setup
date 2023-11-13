import { z } from "zod"

export type GetUserDto = {
	q?: string
}

export const GetUserSchema = z
	.object({
		q: z.string().optional(),
	})
	.strict()
