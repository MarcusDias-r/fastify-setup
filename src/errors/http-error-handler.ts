import {
	FastifyError,
	FastifyInstance,
	FastifyReply,
	FastifyRequest,
} from "fastify"
import { PresenterFactory } from "../factories/presenter.factory"

export const httpErrorHandler = (fastify: FastifyInstance) => {
	fastify.setErrorHandler(
		(error: FastifyError, _: FastifyRequest, reply: FastifyReply) => {
			/* 	if (error instanceof errorCodes.FST_ERR_BAD_STATUS_CODE) {
				reply.status(500).send({ ok: false });
			} else { */
			reply.send(
				new PresenterFactory({ isValid: false, message: [error.message] }),
			)
			/* } */
		},
	)
}
