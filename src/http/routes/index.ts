import { FastifyInstance } from "fastify"
import { usersRoutes } from "./users.routes"

export const bootRoutes = (fastify: FastifyInstance) => {
	fastify.register(usersRoutes, { prefix: "/users" })
}
