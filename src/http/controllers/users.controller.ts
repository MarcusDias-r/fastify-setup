import { FastifyReply, FastifyRequest } from "fastify"
import { MeService } from "../../services/users/me.service"
// import { PresenterFactory } from "../../factories/presenter.factory"
import { PaginationFactory } from "../../factories/pagination.factory"

export class UsersController {
	async me(_req: FastifyRequest, res: FastifyReply) {
		const response = await MeService.execute()

		return await res.status(200).send(
			new PaginationFactory({
				data: [response],
				pagination: { page: 1, perPage: 10, total: 20 },
			}),
		)
		/* 		return await res
			.status(200)
			.send(new PresenterFactory({ data: ["okok", "ioio"] }))
		return await res.status(200).send(response) */
	}
}
