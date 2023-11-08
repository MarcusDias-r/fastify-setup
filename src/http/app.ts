import Fastify from "fastify"
import cors from "@fastify/cors"
import formbody from "@fastify/formbody"
import { bootRoutes } from "./routes"
import { httpErrorHandler } from "../errors/http-error-handler"

export const bootstrap = async () => {
	const fastify = Fastify({
		logger: true,
	})

	bootRoutes(fastify)
	httpErrorHandler(fastify)

	await fastify.register(cors)
	await fastify.register(formbody)

	fastify.listen({ port: 3000 }, function (err, _address) {
		if (err) {
			fastify.log.error(err)
		}
	})
}
