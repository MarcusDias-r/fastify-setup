import { FastifyInstance } from "fastify"
import { UsersController } from "../controllers/users.controller"

export const usersRoutes = async (fastify: FastifyInstance) => {
	const usersController = new UsersController()

	fastify.route({
		url: "/me",
		method: "get",
		handler: usersController.me,
	})
}
