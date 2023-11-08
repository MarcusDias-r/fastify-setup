import { PresenterFactory } from "./presenter.factory"

export class PaginationFactory<T> extends PresenterFactory<T> {
	public readonly pagination: { page: number; perPage: number; total: number }

	constructor(payload: {
		data: T[]
		pagination: { page: number; perPage: number; total: number }
	}) {
		super({ data: payload.data })

		const { pagination } = payload

		this.pagination = {
			page: pagination.page,
			perPage: pagination.perPage,
			total: pagination.total,
		}
	}
}
