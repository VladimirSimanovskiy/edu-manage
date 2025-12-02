import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { dictionaryQuerySchema, type DictionaryQuery } from "./dictionaries.types";
import { dictionariesService, type DictKey } from "./dictionaries.service";

const dictKeySchema = z.enum(["rooms", "teachers", "subjects"]);

type DictionaryItem = Record<string, unknown>;
type DictionaryId = number;

type QueryParams = { dictKey: string };
type ItemsBody = { item: DictionaryItem; items?: undefined } | { item?: undefined; items: DictionaryItem[] };
type UpdateItemsBody = { items?: DictionaryItem[] };
type DeleteItemsBody = { ids?: DictionaryId[] };

export async function registerDictionariesRoutes(app: FastifyInstance) {
	app.post<{ Params: QueryParams; Body: DictionaryQuery }>("/api/dictionaries/:dictKey/query", async (req, reply) => {
		const dictKey = dictKeySchema.parse(req.params.dictKey) as DictKey;
		const body = dictionaryQuerySchema.parse(req.body);
		const data = await dictionariesService.list(dictKey, body);

		return reply.send(data);
	});

	app.post<{ Params: QueryParams; Body: ItemsBody }>("/api/dictionaries/:dictKey/items", async (req, reply) => {
		const dictKey = dictKeySchema.parse(req.params.dictKey) as DictKey;
		const { item, items } = req.body;

		const payload: DictionaryItem[] = items ?? (item ? [item] : []);

		const created = await dictionariesService.createMany(dictKey, payload);
		return reply.send({ items: created });
	});

	app.patch<{ Params: QueryParams; Body: UpdateItemsBody }>(
		"/api/dictionaries/:dictKey/items",
		async (req, reply) => {
			const dictKey = dictKeySchema.parse(req.params.dictKey) as DictKey;
			const { items } = req.body;

			const updated = await dictionariesService.updateMany(dictKey, items ?? []);

			return reply.send({ items: updated });
		}
	);

	app.delete<{ Params: QueryParams; Body: DeleteItemsBody }>(
		"/api/dictionaries/:dictKey/items",
		async (req, reply) => {
			const dictKey = dictKeySchema.parse(req.params.dictKey) as DictKey;
			const { ids } = req.body;

			const result = await dictionariesService.deleteMany(dictKey, ids ?? []);

			return reply.send(result);
		}
	);
}
