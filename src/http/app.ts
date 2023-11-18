import Fastify, { FastifyInstance } from "fastify"
import cors from "@fastify/cors"
import formbody from "@fastify/formbody"
import { bootRoutes } from "./routes"
import { fastifyErrorHandler } from "../errors/fastify-error-handler"

export const bootstrap = async (): Promise<FastifyInstance> => {
	const fastify = Fastify({
		logger: true,
	})

	bootRoutes(fastify)
	fastifyErrorHandler(fastify)

	await fastify.register(cors)
	await fastify.register(formbody)

	return fastify
}
