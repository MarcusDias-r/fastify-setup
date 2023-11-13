import { FastifyRequest as req } from "fastify"

declare module "fastify" {
	interface FastifyRequest extends req {
		user: {
			id: number
			email: string
		}
	}
}
