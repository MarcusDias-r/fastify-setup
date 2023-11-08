import { FastifyInstance } from "fastify"
import { UsersController } from "../controllers/users.controller"
import { queryValidationMiddleware } from "../middlewares"
import getUser from "../middlewares/validations/users/get-users-validation"

export const usersRoutes = async (fastify: FastifyInstance) => {
	const usersController = new UsersController()

	fastify.route({
		url: "/me",
		method: "get",
		handler: usersController.me,
		preHandler: queryValidationMiddleware(getUser),
	})
}
