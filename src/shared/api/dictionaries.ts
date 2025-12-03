import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type DictKey = "rooms" | "teachers" | "subjects";

export type SortDirection = "asc" | "desc";

export type FilterOp = {
	eq?: unknown;
	ne?: unknown;
	in?: unknown[];
	contains?: string;
	gte?: unknown;
	lte?: unknown;
};

export type DictionaryQuery = {
	filters?: Record<string, FilterOp>;
	sort?: Array<{ field: string; dir: SortDirection }>;
	page?: number;
	pageSize?: number;
};

export type DictionaryListResponse<TItem = Record<string, unknown>> = {
	items: TItem[];
	total: number;
	page: number;
	pageSize: number;
};

export type DictionaryItem = Record<string, unknown>;

export async function listDictionary<TItem = DictionaryItem>(
	dictKey: DictKey,
	query: DictionaryQuery
): Promise<DictionaryListResponse<TItem>> {
	const response = await fetch(`/api/dictionaries/${dictKey}/query`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(query)
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch dictionary "${dictKey}"`);
	}

	return (await response.json()) as DictionaryListResponse<TItem>;
}

export async function createDictionaryItems<TItem = DictionaryItem>(
	dictKey: DictKey,
	items: DictionaryItem[]
): Promise<TItem[]> {
	const response = await fetch(`/api/dictionaries/${dictKey}/items`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ items })
	});

	if (!response.ok) {
		throw new Error(`Failed to create items in dictionary "${dictKey}"`);
	}

	const json = (await response.json()) as { items: TItem[] };
	return json.items;
}

export async function updateDictionaryItems<TItem = DictionaryItem>(
	dictKey: DictKey,
	items: DictionaryItem[]
): Promise<TItem[]> {
	const response = await fetch(`/api/dictionaries/${dictKey}/items`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ items })
	});

	if (!response.ok) {
		throw new Error(`Failed to update items in dictionary "${dictKey}"`);
	}

	const json = (await response.json()) as { items: TItem[] };
	return json.items;
}

export async function deleteDictionaryItems(
	dictKey: DictKey,
	ids: number[]
): Promise<{ deletedCount: number; deletedIds: number[] }> {
	const response = await fetch(`/api/dictionaries/${dictKey}/items`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ ids })
	});

	if (!response.ok) {
		throw new Error(`Failed to delete items from dictionary "${dictKey}"`);
	}

	return (await response.json()) as {
		deletedCount: number;
		deletedIds: number[];
	};
}

export function useDictionaryList<TItem = DictionaryItem>(dictKey: DictKey, query: DictionaryQuery) {
	return useQuery({
		queryKey: ["dictionary", dictKey, query],
		queryFn: () => listDictionary<TItem>(dictKey, query)
	});
}

type CreateItemsVariables = {
	dictKey: DictKey;
	items: DictionaryItem[];
};

type UpdateItemsVariables = {
	dictKey: DictKey;
	items: DictionaryItem[];
};

type DeleteItemsVariables = {
	dictKey: DictKey;
	ids: number[];
};

export function useDictionaryMutations() {
	const queryClient = useQueryClient();

	const invalidateDictionary = (dictKey: DictKey) => {
		void queryClient.invalidateQueries({
			queryKey: ["dictionary", dictKey]
		});
	};

	const createItems = useMutation({
		mutationFn: ({ dictKey, items }: CreateItemsVariables) => createDictionaryItems(dictKey, items),
		onSuccess: (_data, variables) => {
			invalidateDictionary(variables.dictKey);
		}
	});

	const updateItems = useMutation({
		mutationFn: ({ dictKey, items }: UpdateItemsVariables) => updateDictionaryItems(dictKey, items),
		onSuccess: (_data, variables) => {
			invalidateDictionary(variables.dictKey);
		}
	});

	const deleteItems = useMutation({
		mutationFn: ({ dictKey, ids }: DeleteItemsVariables) => deleteDictionaryItems(dictKey, ids),
		onSuccess: (_data, variables) => {
			invalidateDictionary(variables.dictKey);
		}
	});

	return {
		createItems,
		updateItems,
		deleteItems
	};
}
