/* eslint-disable import/extensions */
import { prisma } from "@/config/prisma"
import { HttpStatus } from "@/constants/https-status.constant"
import { HttpException } from "@/factories/http-error.factory"
import { LoginDto } from "@/http/middlewares/validations/auth/login.validation"
import { compare, hash } from "bcrypt"
import { log } from "console"
import jwt from "jsonwebtoken"

export class LoginService {
	private secret = process.env.JWT_SECRET || "secret"
	private expiresTime = 3.6e6 * 48

	async handle({ email, password }: LoginDto) {
		const user = await prisma.users.findUnique({ where: { email } })

		if (!user)
			throw new HttpException("account not found", HttpStatus.NOT_FOUND)

		const areEqual = await compare(String(password), user.password)
		console.log({ areEqual, password, up: user.password })

		if (!areEqual)
			throw new HttpException("invalid credentials", HttpStatus.UNAUTHORIZED)

		const token = jwt.sign({ id: user.id, email: user.email }, this.secret, {
			expiresIn: this.expiresTime,
		})

		const expiresIn = new Date()
		expiresIn.setTime(expiresIn.getTime() + this.expiresTime)

		const response = { token, expiresIn: expiresIn.toISOString(), user }

		return response
	}
}
