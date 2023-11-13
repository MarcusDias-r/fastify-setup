import Fastify from "fastify"
import cors from "@fastify/cors"
import formbody from "@fastify/formbody"
import { bootRoutes } from "./routes"
import { fastifyErrorHandler } from "../errors/fastify-error-handler"

const port = Number(process.env.PORT) || 3000

export const bootstrap = async () => {
	const fastify = Fastify({
		logger: true,
	})

	bootRoutes(fastify)
	fastifyErrorHandler(fastify)

	await fastify.register(cors)
	await fastify.register(formbody)

	fastify.listen({ port }, function (err, _address) {
		if (err) {
			fastify.log.error(err)
		}
	})
}
