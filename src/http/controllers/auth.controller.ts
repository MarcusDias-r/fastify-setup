import { FastifyReply, FastifyRequest } from "fastify"
import { PresenterFactory } from "@/factories/presenter.factory"
import { LoginService } from "@/services/auth/login.service"
import { LoginDto } from "../middlewares/validations/auth/login.validation"
import { RegisterService } from "@/services/auth/register.service"
import { RegisterDto } from "../middlewares/validations/auth/register.validation"

export class AuthController {
	async login(req: FastifyRequest, res: FastifyReply) {
		const response = await new LoginService().handle(req.body as LoginDto)

		return await res.status(200).send(
			new PresenterFactory({
				data: [response],
			}),
		)
	}

	async register(req: FastifyRequest, res: FastifyReply) {
		const response = await new RegisterService().handle(req.body as RegisterDto)

		return await res.status(200).send(
			new PresenterFactory({
				data: [response],
			}),
		)
	}
}
