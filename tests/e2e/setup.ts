import supertest from "supertest"
import { bootstrap } from "../../src/http/app"

let request: any = undefined

export const setup = async () => {
	if (request) return request

	const app = await bootstrap()
	await app.ready()
	request = supertest(app.server)

	return request
}
