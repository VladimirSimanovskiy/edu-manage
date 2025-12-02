import { prisma } from "../infra/prisma";
import type { DictionaryQuery, FilterOp } from "./dictionaries.types";

export type DictKey = "rooms" | "teachers" | "subjects";

type Id = number;

type WhereInput = Record<string, unknown>;

type OrderByInput =
	| Array<{
			[field: string]: "asc" | "desc";
	  }>
	| undefined;

type CreateArgs = {
	data: Record<string, unknown>;
};

type UpdateArgs = {
	data: Record<string, unknown>;
	where: { id: Id };
};

type DeleteManyArgs = {
	where: { id: { in: Id[] } };
};

type FindManyArgs = {
	where?: WhereInput;
	orderBy?: OrderByInput;
	skip?: number;
	take?: number;
};

type CountArgs = {
	where?: WhereInput;
};

interface DictionaryRepo {
	findMany(args: FindManyArgs): Promise<unknown[]>;
	count(args: CountArgs): Promise<number>;
	create(args: CreateArgs): Promise<unknown>;
	update(args: UpdateArgs): Promise<unknown>;
	deleteMany(args: DeleteManyArgs): Promise<{ count: number }>;
}

const prismaByDictKey: Record<DictKey, DictionaryRepo> = {
	rooms: prisma.room,
	teachers: prisma.teacher,
	subjects: prisma.subject
};

function getRepo(dictKey: DictKey): DictionaryRepo {
	const repo = prismaByDictKey[dictKey];

	if (!repo) {
		throw new Error(`Unknown dictKey: ${dictKey}`);
	}

	return repo;
}

function mapFilterOpToPrismaCondition(op?: FilterOp): WhereInput | undefined {
	if (!op) return undefined;

	const cond: WhereInput = {};

	if (op.eq !== undefined) {
		cond.equals = op.eq;
	}
	if (op.ne !== undefined) {
		cond.not = op.ne;
	}
	if (op.in !== undefined) {
		cond.in = op.in;
	}
	if (op.contains !== undefined) {
		cond.contains = op.contains;
	}
	if (op.gte !== undefined) {
		cond.gte = op.gte;
	}
	if (op.lte !== undefined) {
		cond.lte = op.lte;
	}

	return Object.keys(cond).length > 0 ? cond : undefined;
}

function buildWhere(filters: DictionaryQuery["filters"]): WhereInput | undefined {
	if (!filters) return undefined;

	const where: WhereInput = {};

	for (const [field, op] of Object.entries(filters)) {
		const cond = mapFilterOpToPrismaCondition(op as FilterOp);

		if (cond) {
			where[field] = cond;
		}
	}

	return where;
}

function buildOrderBy(sort: DictionaryQuery["sort"]): OrderByInput {
	if (!sort) return undefined;

	return sort.map((s) => ({
		[s.field]: s.dir
	}));
}

export const dictionariesService = {
	async list(dictKey: DictKey, query: DictionaryQuery) {
		const repo = getRepo(dictKey);
		const where = buildWhere(query.filters);
		const orderBy = buildOrderBy(query.sort);

		const skip = (query.page - 1) * query.pageSize;
		const take = query.pageSize;

		const [items, total] = await Promise.all([
			repo.findMany({ where, orderBy, skip, take }),
			repo.count({ where })
		]);

		return {
			items,
			total,
			page: query.page,
			pageSize: query.pageSize
		};
	},

	async createMany(dictKey: DictKey, items: Array<Record<string, unknown>>) {
		const repo = getRepo(dictKey);
		const created: unknown[] = [];

		for (const item of items) {
			created.push(await repo.create({ data: item }));
		}

		return created;
	},

	async updateMany(dictKey: DictKey, items: Array<Record<string, unknown>>) {
		const repo = getRepo(dictKey);
		const updated: unknown[] = [];

		for (const item of items) {
			const { id, ...data } = item;

			if (typeof id !== "number") {
				continue;
			}

			updated.push(
				await repo.update({
					data,
					where: { id }
				})
			);
		}

		return updated;
	},

	async deleteMany(dictKey: DictKey, ids: Id[]) {
		const repo = getRepo(dictKey);
		const numericIds = ids.filter((id): id is Id => typeof id === "number");
		const result = await repo.deleteMany({
			where: { id: { in: numericIds } }
		});

		return { deletedCount: result.count, deletedIds: numericIds };
	}
};
