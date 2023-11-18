/* eslint-disable import/extensions */
import { prisma } from "@/config/prisma"
import { HttpStatus } from "@/constants/https-status.constant"
import HttpError from "@/errors/http-error-handler"
import { LoginDto } from "@/http/middlewares/validations/auth/login.validation"
import { compare } from "bcrypt"
import jwt from "jsonwebtoken"

export class LoginService {
	private secret = process.env.JWT_SECRET || "secret"
	private expiresTime = 3.6e6 * 48

	async handle({ email, password }: LoginDto) {
		const user = await prisma.users.findUnique({ where: { email } })

		if (!user) throw new HttpError("account not found", HttpStatus.NOT_FOUND)

		const areEqual = compare(password, user.password)

		if (!areEqual)
			throw new HttpError("invalid credentials", HttpStatus.UNAUTHORIZED)

		const token = jwt.sign({ id: user.id, email: user.email }, this.secret, {
			expiresIn: this.expiresTime,
		})

		const expiresIn = new Date()
		expiresIn.setTime(expiresIn.getTime() + this.expiresTime)

		const response = { token, expiresIn: expiresIn.toISOString(), user }

		return response
	}
}
