import Fastify, { FastifyInstance } from "fastify"
import cors from "@fastify/cors"
import formbody from "@fastify/formbody"
import { bootRoutes } from "./routes"
import { fastifyErrorHandler } from "../errors/fastify-error-handler"
import fastifyEnv, { FastifyEnvOptions } from "@fastify/env"

export const bootstrap = async (
	options?: FastifyEnvOptions,
): Promise<FastifyInstance> => {
	const fastify = Fastify({
		logger: true,
	})

	if (options) {
		await fastify.register(fastifyEnv, options)
	}

	fastify.register(cors)
	fastify.register(formbody)

	bootRoutes(fastify)
	fastifyErrorHandler(fastify)

	return fastify
}
