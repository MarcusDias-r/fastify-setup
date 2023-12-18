import supertest from "supertest"
import { bootstrap } from "../../../src/http/app"
import { prisma } from "../../../src/config/prisma"
import { setup } from "../setup"
import { hash } from "bcrypt"

describe("POST /auth/login", () => {
	let request: any

	beforeAll(async () => {
		request = await setup()

		await prisma.users.create({
			data: {
				name: "Test User",
				email: "fastify@gmail.com",
				password: await hash("40028922", 10),
			},
		})
	})

	test("should make user authentication and return token", async () => {
		const { body, statusCode } = await request
			.post("/auth/login")
			.send({ email: "fastify@gmail.com", password: "40028922" })

		const result = body.result ? body.result : undefined
		const token = result && result.length ? result[0].token : undefined

		expect(token).toBeDefined()
		expect(statusCode).toBe(200)
	})

	test("should failed with status code 404 (wrong email)", async () => {
		const response = await request
			.post("/auth/login")
			.send({ email: "wrongemail@gmail.com", password: "40028922" })

		expect(response.statusCode).toBe(404)
	})

	test("should failed with status code 401 (wrong password)", async () => {
		const response = await request
			.post("/auth/login")
			.send({ email: "fastify@gmail.com", password: "12345678" })

		expect(response.statusCode).toBe(401)
	})

	afterAll(async () => {
		await prisma.users.deleteMany()
	})
})
