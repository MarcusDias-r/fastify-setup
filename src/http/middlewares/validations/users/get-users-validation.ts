import { z } from "zod"

export default z
	.object({
		q: z.string().optional(),
	})
	.strict()
