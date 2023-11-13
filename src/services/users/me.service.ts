/* eslint-disable import/extensions */
import { prisma } from "@/config/prisma"

export class MeService {
	async handle(user: { id: number; email: string }) {
		const response = await prisma.users.findUnique({ where: { id: user.id } })
		return response
	}
}
