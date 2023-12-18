import supertest from "supertest"
import { bootstrap } from "../../src/http/app"
import path from "path"

let request: any = undefined

export const setup = async () => {
	if (request) return request

	const app = await bootstrap({
		schema: {
			type: "object",
			required: ["DATABASE_URL", "PORT", "JWT_SECRET"],
		},
		dotenv: {
			path: `${path.join(__dirname, "../../.env.test")}`,
		},
	})

	await app.ready()
	request = supertest(app.server)

	return request
}

let webToken: string

export const webLogin = async (email: string, password: string) => {
	if (webToken) return webToken

	const request = await setup()

	const { body } = await request
		.post(`/auth/register`)
		.send({ email, password, name: "something" })

	webToken = body.result[0].token

	return webToken
}
