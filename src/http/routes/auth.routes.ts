/* eslint-disable import/extensions */
import { FastifyInstance } from "fastify"
import { AuthController } from "../controllers/auth.controller"
import { queryValidationMiddleware } from "../middlewares"
import { LoginSchema } from "../middlewares/validations/auth/login.validation"
import { RegisterSchema } from "../middlewares/validations/auth/register.validation"

export const authRoutes = async (fastify: FastifyInstance) => {
	const authController = new AuthController()

	fastify.route({
		url: "/login",
		method: "post",
		handler: authController.login,
		preHandler: [queryValidationMiddleware(LoginSchema)],
	})

	fastify.route({
		url: "/register",
		method: "post",
		handler: authController.register,
		preHandler: [queryValidationMiddleware(RegisterSchema)],
	})
}
