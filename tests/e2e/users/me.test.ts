import { prisma } from "../../../src/config/prisma"
import { setup, webLogin } from "../setup"

describe(`POST /users/me`, () => {
	let request: any
	let token: string

	beforeAll(async () => {
		request = await setup()
		token = await webLogin("email@gmail.com", "40028922")
	})

	test("should return status code 200", async () => {
		const response = await request
			.get(`/users/me`)
			.auth(token, { type: "bearer" })

		expect(response.statusCode).toBe(200)
	})

	afterAll(async () => {
		await prisma.users.deleteMany()
	})
})
