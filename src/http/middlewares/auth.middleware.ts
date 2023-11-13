/* eslint-disable import/extensions */
import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify"
import { verify } from "jsonwebtoken"
import HttpError from "@/errors/http-error-handler"

interface TokenPayload {
	id: number
	email: string
}

interface Request extends FastifyRequest {
	user: TokenPayload
}

export const authMiddleware =
	(secret: string) =>
	(req: Request, _res: FastifyReply, next: HookHandlerDoneFunction) => {
		const authHeader = req.headers.authorization

		if (!authHeader) {
			throw new HttpError("JWT token is missing", 422)
		}

		const [, token] = authHeader.split(" ")

		try {
			const decoded = verify(token, secret)

			const { id, email } = decoded as TokenPayload

			req.user = {
				id,
				email,
			}

			// logger.debug("[authenticatedMiddleware] " + JSON.stringify(req.user))

			return next()
		} catch {
			throw new HttpError("Invalid JWT token", 422)
		}
	}
