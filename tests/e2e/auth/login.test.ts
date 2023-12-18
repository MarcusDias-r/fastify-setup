import supertest from "supertest"
import { bootstrap } from "../../../src/http/app"
import { prisma } from "../../../src/config/prisma"
import { setup } from "../setup"

describe("POST /auth/login", () => {
	let request: any

	beforeAll(async () => {
		request = await setup()

		await prisma.users.create({
			data: {
				name: "Test User",
				email: "test.user@gmail.com",
				password: "40028922",
			},
		})
	})

	test("should make user authentication and return token", async () => {
		const response = await request
			.post("/auth/login")
			.send({ email: "test.user@gmail.com", password: "40028922" })

		expect(response.body.result[0].token).toBeDefined()
		expect(response.statusCode).toBe(200)
	})

	afterAll(async () => {
		await prisma.users.deleteMany()
	})
})
