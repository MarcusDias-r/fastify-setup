import {
	FastifyError,
	FastifyInstance,
	FastifyReply,
	FastifyRequest,
} from "fastify"
import { PresenterFactory } from "../factories/presenter.factory"
import { ZodError } from "zod"
import { HttpException } from "@/factories/http-error.factory"

export const fastifyErrorHandler = (fastify: FastifyInstance) => {
	fastify.setErrorHandler(
		(error: FastifyError, _: FastifyRequest, reply: FastifyReply) => {
			if (error instanceof ZodError) {
				return reply.status(422).send(
					new PresenterFactory({
						isValid: false,
						message: [JSON.stringify(error.format())],
					}),
				)
			} else if (error instanceof HttpException) {
				return reply.status(error.status).send(
					new PresenterFactory({
						isValid: false,
						message: [error.message],
					}),
				)
			} else {
				return reply.send(
					new PresenterFactory({ isValid: false, message: [error.message] }),
				)
			}
		},
	)
}
