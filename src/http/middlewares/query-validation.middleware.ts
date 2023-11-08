import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify"
import { AnyZodObject } from "zod"

export default (schema: AnyZodObject) =>
	async (
		req: FastifyRequest,
		_: FastifyReply,
		next: HookHandlerDoneFunction,
	): Promise<any> => {
		await schema.parseAsync(req.query)
		next()
	}
