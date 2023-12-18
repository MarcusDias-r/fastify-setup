import supertest from "supertest"
import { bootstrap } from "../../../src/http/app"
import { prisma } from "../../../src/config/prisma"
import { setup } from "../setup"

describe("POST /auth/register", () => {
	let request: any

	beforeAll(async () => {
		request = await setup()
	})

	test("should create a new user and return token", async () => {
		const response = await request.post("/auth/register").send({
			name: "Test User",
			email: "test.user@gmail.com",
			password: "40028922",
		})

		const body = await response.body

		const result = body.result ? body.result : undefined
		const token = result && result.length ? result[0].token : undefined

		expect(token).toBeDefined()
		expect(response.statusCode).toBe(200)
	})

	afterAll(async () => {
		await prisma.users.deleteMany()
	})
})
