import { bootstrap } from "./http/app"

const port = Number(process.env.PORT) || 3000

const run = async () => {
	const app = await bootstrap()

	app.listen({ port }, function (err, _address) {
		if (err) {
			app.log.error(err)
		}
	})
}

run()
