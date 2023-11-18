import { FastifyInstance } from "fastify"
import { usersRoutes } from "./users.routes"
import { authRoutes } from "./auth.routes"

export const bootRoutes = (fastify: FastifyInstance) => {
	fastify.register(usersRoutes, { prefix: "/users" })
	fastify.register(authRoutes, { prefix: "/auth" })
}
