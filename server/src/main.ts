import Fastify from "fastify";
import { registerDictionariesRoutes } from "./dictionaries/dictionaries.routes";

async function bootstrap() {
	const app = Fastify({
		logger: true
	});

	await registerDictionariesRoutes(app);

	const port = Number(process.env.PORT ?? 3000);
	const host = process.env.HOST ?? "0.0.0.0";

	try {
		await app.listen({ port, host });
		// eslint-disable-next-line no-console
		console.log(`Server is running on http://${host}:${port}`);
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
}

void bootstrap();
