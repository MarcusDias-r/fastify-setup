/* eslint-disable import/extensions */
import { FastifyInstance } from "fastify"
import { UsersController } from "../controllers/users.controller"
import { queryValidationMiddleware } from "../middlewares"
import { GetUserSchema } from "@/http/middlewares/validations/users/get-users.validation"
import { authMiddleware } from "../middlewares/auth.middleware"

export const usersRoutes = async (fastify: FastifyInstance) => {
	fastify.addHook("preHandler", authMiddleware(process.env.JWT_SECRET))

	const usersController = new UsersController()

	fastify.route({
		url: "/me",
		method: "get",
		handler: usersController.me,
		preHandler: async () => queryValidationMiddleware(GetUserSchema),
	})
}
