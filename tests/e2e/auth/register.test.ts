import supertest from "supertest"
import { bootstrap } from "../../../src/http/app"
import { prisma } from "../../../src/config/prisma"
import { setup } from "../setup"

describe("POST /auth/login", () => {
	let request: any

	beforeAll(async () => {
		request = await setup()
	})

	test("should make create a new user and return token", async () => {
		const response = await request.post("/auth/register").send({
			name: "Test User",
			email: "test.user@gmail.com",
			password: "40028922",
		})

		const token = response.body.result[0].token

		expect(token).toBeDefined()
		expect(response.statusCode).toBe(200)
	})

	afterAll(async () => {
		await prisma.users.deleteMany()
	})
})
