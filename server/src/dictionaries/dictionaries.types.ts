import { z } from "zod";

export const sortDirectionSchema = z.enum(["asc", "desc"]);
export type SortDirection = z.infer<typeof sortDirectionSchema>;

export const filterOpSchema = z.object({
	eq: z.any().optional(),
	ne: z.any().optional(),
	in: z.array(z.any()).optional(),
	contains: z.string().optional(),
	gte: z.any().optional(),
	lte: z.any().optional()
});

export type FilterOp = z.infer<typeof filterOpSchema>;

export type FiltersInput = Record<string, FilterOp>;

export const dictionaryQuerySchema = z.object({
	filters: z.record(z.string(), filterOpSchema).optional(),
	sort: z
		.array(
			z.object({
				field: z.string(),
				dir: sortDirectionSchema
			})
		)
		.optional(),
	page: z.number().int().min(1).default(1),
	pageSize: z.number().int().min(1).max(200).default(20)
});

export type DictionaryQuery = z.infer<typeof dictionaryQuerySchema>;
