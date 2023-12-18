/* eslint-disable import/extensions */
import { prisma } from "@/config/prisma"
import { HttpStatus } from "@/constants/https-status.constant"
import HttpError from "@/errors/http-error-handler"
import { RegisterDto } from "@/http/middlewares/validations/auth/register.validation"
import { hash } from "bcrypt"
import jwt from "jsonwebtoken"
import { omit } from "lodash"

export class RegisterService {
	private secret = process.env.JWT_SECRET || "secret"
	private expiresTime = 3.6e6 * 48

	async handle({ email, name, password }: RegisterDto) {
		const alreadyExist = await prisma.users.findUnique({
			where: { email },
		})

		if (alreadyExist)
			throw new HttpError("user already exist", HttpStatus.CONFLICT)

		const user = await prisma.users.create({
			data: { email, name, password: await hash(password, 10) },
		})

		const token = jwt.sign({ id: user.id, email: user.email }, this.secret, {
			expiresIn: this.expiresTime,
		})

		return { token, user: omit(user, ["password"]) }
	}
}
