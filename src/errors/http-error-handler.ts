import {
	FastifyError,
	FastifyInstance,
	FastifyReply,
	FastifyRequest,
} from "fastify"
import { PresenterFactory } from "../factories/presenter.factory"
import { ZodError } from "zod"

export const httpErrorHandler = (fastify: FastifyInstance) => {
	fastify.setErrorHandler(
		(error: FastifyError, _: FastifyRequest, reply: FastifyReply) => {
			if (error instanceof ZodError) {
				return reply.status(422).send(
					new PresenterFactory({
						isValid: false,
						message: [error.format()._errors[0]],
					}),
				)
			} else {
				reply.send(
					new PresenterFactory({ isValid: false, message: [error.message] }),
				)
			}
		},
	)
}
