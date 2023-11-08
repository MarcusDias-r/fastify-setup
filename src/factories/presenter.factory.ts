export class PresenterFactory<T> {
	public readonly result: T[] | undefined

	public readonly message?: string[]

	public readonly isValid: boolean = true

	constructor(payload: { data?: T[]; message?: string[]; isValid?: boolean }) {
		const { data, message, isValid } = payload

		this.result = data || undefined
		this.message = message
		this.isValid =
			isValid !== undefined && isValid !== null ? isValid : this.isValid
	}
}
