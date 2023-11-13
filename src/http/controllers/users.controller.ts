import { FastifyReply, FastifyRequest } from "fastify"
import { MeService } from "../../services/users/me.service"
import { PresenterFactory } from "@/factories/presenter.factory"

export class UsersController {
	async me(req: FastifyRequest, res: FastifyReply) {
		const response = await new MeService().handle(req.user)

		return await res
			.status(200)
			.send(new PresenterFactory({ data: [response] }))
	}
}
