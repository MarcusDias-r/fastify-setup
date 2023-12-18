import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify"
import { AnyZodObject } from "zod"


export default (schema: AnyZodObject) =>
	async (
		req: FastifyRequest,
		_: FastifyReply,
		// next: HookHandlerDoneFunction,
	) => {
		try {
			const data = {
				...(req.body as any),
				...(req.query as any),
				...(req.params as any),
			}

			await schema.parseAsync(data)
			// next()
		} catch (error) {
			console.error("Validation error:", error)
			throw error
			// 	next(error)
		}
	}