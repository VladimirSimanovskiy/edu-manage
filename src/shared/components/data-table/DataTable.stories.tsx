import { Meta, StoryObj } from "@storybook/react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../table/Table";
import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	Row,
	SortingState,
	useReactTable,
	VisibilityState
} from "@tanstack/react-table";
import { Checkbox } from "@/components/checkbox";
import { Badge } from "@/components/badge";
import { Button, IconButton } from "@/components/button";
import { Icon } from "@/components/icon";
import {
	ArrowUpDown,
	ChevronsUpDown,
	GripVertical,
	MoreHorizontal,
	Pen,
	SearchIcon,
	Trash,
	Trash2
} from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger
} from "@/components/dropdown";
import React, { CSSProperties, useCallback, useMemo, useState } from "react";
import { TextInput } from "@/components/input";
import { FormBody } from "@/components/form";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/sheet";
import { AsyncSearchSelect } from "@/components/search-select";
import {
	closestCenter,
	DndContext,
	DragEndEvent,
	KeyboardSensor,
	MouseSensor,
	TouchSensor,
	UniqueIdentifier,
	useSensor,
	useSensors
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const meta: Meta<typeof Table> = {
	component: Table,
	parameters: {
		layout: "centered"
	},
	tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof Table>;

export const DataTableExample: Story = {
	render: () => {
		function getData(): Payment[] {
			return [
				{
					id: "1",
					amount: 100,
					status: "pending",
					email: "john.doe@example.com"
				},
				{
					id: "2",
					amount: 500,
					status: "success",
					email: "jane.smith@example.com"
				},
				{
					id: "3",
					amount: 200,
					status: "failed",
					email: "bob.wilson@example.com"
				},
				{
					id: "4",
					amount: 800,
					status: "pending",
					email: "alice.brown@example.com"
				},
				{
					id: "5",
					amount: 200,
					status: "success",
					email: "charlie.davis@example.com"
				},
				{
					id: "6",
					amount: 400,
					status: "processing",
					email: "diana.miller@example.com"
				},
				{
					id: "7",
					amount: 300,
					status: "success",
					email: "eve.johnson@example.com"
				},
				{
					id: "8",
					amount: 700,
					status: "failed",
					email: "frank.garcia@example.com"
				},
				{
					id: "9",
					amount: 900,
					status: "pending",
					email: "grace.lee@example.com"
				},
				{
					id: "10",
					amount: 1000,
					status: "success",
					email: "henry.taylor@example.com"
				},
				{
					id: "11",
					amount: 10,
					status: "processing",
					email: "iris.moore@example.com"
				},
				{
					id: "12",
					amount: 170,
					status: "failed",
					email: "jack.white@example.com"
				},
				{
					id: "13",
					amount: 130,
					status: "success",
					email: "kate.harris@example.com"
				},
				{
					id: "14",
					amount: 200,
					status: "pending",
					email: "leo.martin@example.com"
				}
			];
		}

		interface DataTableProps<TData, TValue> {
			columns: ColumnDef<TData, TValue>[];
			data: TData[];
		}

		type Payment = {
			id: string;
			amount: number;
			status: "pending" | "processing" | "success" | "failed";
			email: string;
		};

		const columns: ColumnDef<Payment>[] = [
			{
				id: "select",
				header: ({ table }) => (
					<Checkbox
						checked={
							table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
						}
						onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
						aria-label="Select all"
					/>
				),
				cell: ({ row }) => (
					<Checkbox
						checked={row.getIsSelected()}
						onCheckedChange={(value) => row.toggleSelected(!!value)}
						aria-label="Select row"
					/>
				),
				enableSorting: false,
				enableHiding: false
			},
			{
				accessorKey: "status",
				header: "Status",
				cell: ({ row }) => {
					const status =
						row.original.status === "success"
							? "success"
							: row.original.status === "failed"
								? "error"
								: row.original.status === "pending"
									? "warning"
									: "info";
					return <Badge status={status}>{row.original.status}</Badge>;
				}
			},
			{
				accessorKey: "email",
				header: "Email"
			},
			{
				accessorKey: "amount",
				header: ({ column }) => {
					return (
						<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
							Amount
							<Icon icon={ArrowUpDown} />
						</Button>
					);
				},
				cell: ({ row }) => {
					const amount = parseFloat(row.getValue("amount"));
					const formatted = new Intl.NumberFormat("en-US", {
						style: "currency",
						currency: "USD"
					}).format(amount);

					return <div className="text-right font-medium">{formatted}</div>;
				}
			},
			{
				id: "actions",
				cell: ({ row }) => {
					const payment = row.original;

					return (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" className="h-8 w-8 p-0">
									<span className="sr-only">Open menu</span>
									<Icon icon={MoreHorizontal} />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>Actions</DropdownMenuLabel>
								<DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
									Copy payment ID
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					);
				}
			}
		];

		function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
			const [sorting, setSorting] = React.useState<SortingState>([]);
			const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
			const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
			const [rowSelection, setRowSelection] = React.useState({});

			const table = useReactTable({
				data,
				columns,
				onSortingChange: setSorting,
				onColumnFiltersChange: setColumnFilters,
				getCoreRowModel: getCoreRowModel(),
				getPaginationRowModel: getPaginationRowModel(),
				getSortedRowModel: getSortedRowModel(),
				getFilteredRowModel: getFilteredRowModel(),
				onColumnVisibilityChange: setColumnVisibility,
				onRowSelectionChange: setRowSelection,
				state: {
					sorting,
					columnFilters,
					columnVisibility,
					rowSelection
				}
			});

			return (
				<div>
					<div className="flex w-[500px] items-center justify-between gap-3 py-4">
						<div>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="outline" className="ml-auto">
										Columns
										<Icon icon={ChevronsUpDown} />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									{table
										.getAllColumns()
										.filter((column) => column.getCanHide())
										.map((column) => {
											return (
												<DropdownMenuCheckboxItem
													key={column.id}
													className="capitalize"
													checked={column.getIsVisible()}
													onCheckedChange={(value) => column.toggleVisibility(!!value)}
												>
													{column.id}
												</DropdownMenuCheckboxItem>
											);
										})}
								</DropdownMenuContent>
							</DropdownMenu>
						</div>

						<TextInput
							className="w-[200px]"
							startIcon={<Icon icon={SearchIcon} />}
							placeholder="Filter emails..."
							value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
							onChange={(event) => table.getColumn("email")?.setFilterValue(event)}
						/>
					</div>

					<div className="overflow-hidden rounded-md border">
						<Table>
							<TableHeader>
								{table.getHeaderGroups().map((headerGroup) => (
									<TableRow key={headerGroup.id}>
										{headerGroup.headers.map((header) => {
											return (
												<TableHead key={header.id}>
													{header.isPlaceholder
														? null
														: flexRender(
																header.column.columnDef.header,
																header.getContext()
															)}
												</TableHead>
											);
										})}
									</TableRow>
								))}
							</TableHeader>
							<TableBody>
								{table.getRowModel().rows?.length ? (
									table.getRowModel().rows.map((row) => (
										<TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
											{row.getVisibleCells().map((cell) => (
												<TableCell key={cell.id}>
													{flexRender(cell.column.columnDef.cell, cell.getContext())}
												</TableCell>
											))}
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell colSpan={columns.length} className="h-24 text-center">
											No results.
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
					<div className="flex items-center justify-end space-x-2 py-4">
						<Button
							variant="outline"
							size="sm"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
						>
							Previous
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
						>
							Next
						</Button>
					</div>
				</div>
			);
		}

		function DemoPage() {
			const data = getData();

			return (
				<div className="container mx-auto py-10">
					<DataTable columns={columns} data={data} />
				</div>
			);
		}

		return <DemoPage />;
	}
};

export const EditableTable: Story = {
	render: () => {
		function EditableTableComponent() {
			const [data, setData] = useState([
				{ id: "1", name: "Александр Иванов" },
				{ id: "2", name: "Мария Петрова" },
				{ id: "3", name: "Дмитрий Сидоров" },
				{ id: "4", name: "Анна Козлова" },
				{ id: "5", name: "Сергей Волков" },
				{ id: "6", name: "Елена Морозова" },
				{ id: "7", name: "Андрей Лебедев" },
				{ id: "8", name: "Ольга Соколова" },
				{ id: "9", name: "Игорь Новиков" },
				{ id: "10", name: "Татьяна Федорова" }
			]);

			const [rowSelection, setRowSelection] = useState({});
			const [isSheetOpen, setIsSheetOpen] = useState(false);
			const [editingItem, setEditingItem] = useState<{ id: string; name: string } | null>(null);
			const [selectedUser, setSelectedUser] = useState<{ value: string; label: string } | undefined>(undefined);
			const [searchQuery, setSearchQuery] = useState("");

			const filteredData = useMemo(() => {
				if (!searchQuery) return data;
				return data.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
			}, [data, searchQuery]);

			const columns: ColumnDef<{ id: string; name: string }>[] = [
				{
					id: "select",
					header: ({ table }) => (
						<Checkbox
							checked={
								table.getIsAllPageRowsSelected() ||
								(table.getIsSomePageRowsSelected() && "indeterminate")
							}
							onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
							onClick={(e) => e.stopPropagation()}
							aria-label="Select all"
						/>
					),
					cell: ({ row }) => (
						<div className="flex items-center gap-2">
							<Checkbox
								checked={row.getIsSelected()}
								onCheckedChange={(value) => row.toggleSelected(!!value)}
								onClick={(e) => e.stopPropagation()}
								aria-label="Select row"
							/>
							<IconButton
								icon={Pen}
								variant="text"
								className="h-4 w-4 cursor-pointer rounded-none p-0"
								onClick={(e) => {
									e.stopPropagation();
									handleRowClick(row.original);
								}}
							/>
						</div>
					),
					enableSorting: false,
					enableHiding: false
				},
				{
					accessorKey: "name",
					header: "Имя"
				}
			];

			const table = useReactTable({
				data: filteredData,
				columns,
				getCoreRowModel: getCoreRowModel(),
				getPaginationRowModel: getPaginationRowModel(),
				onRowSelectionChange: setRowSelection,
				state: {
					rowSelection
				},
				initialState: {
					pagination: {
						pageSize: 8
					}
				}
			});

			const selectedCount = table.getFilteredSelectedRowModel().rows.length;

			const handleEdit = (item: { id: string; name: string }) => {
				setEditingItem(item);
				setSelectedUser({ value: item.id, label: item.name });
				setIsSheetOpen(true);
			};

			const handleAdd = () => {
				setEditingItem(null);
				setSelectedUser(undefined);
				setIsSheetOpen(true);
			};

			const handleSave = () => {
				if (!selectedUser) return;

				if (editingItem) {
					setData((prev) =>
						prev.map((item) => (item.id === editingItem.id ? { ...item, name: selectedUser.label } : item))
					);
				} else {
					if (!data.some((item) => item.id === selectedUser.value)) {
						const newUser = {
							id: selectedUser.value,
							name: selectedUser.label
						};
						setData((prev) => [...prev, newUser]);
					}
				}

				setSelectedUser(undefined);
				setEditingItem(null);
				setIsSheetOpen(false);
			};

			const handleDeleteSelected = () => {
				const selectedRows = table.getFilteredSelectedRowModel().rows;
				const selectedIds = selectedRows.map((row) => row.original.id);
				setData((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
				setRowSelection({});
			};

			const handleUserChange = (option: { value: string; label: string } | null) => {
				setSelectedUser(option || undefined);
			};

			const loadOptions = useCallback(async ({ searchQuery }: { searchQuery: string }) => {
				await new Promise((resolve) => setTimeout(resolve, 300));

				const mockUsers = [
					{ email: "user1@example.com", name: "Пользователь 1" },
					{ email: "user2@example.com", name: "Пользователь 2" },
					{ email: "user3@example.com", name: "Пользователь 3" },
					{ email: "user4@example.com", name: "Пользователь 4" },
					{ email: "user5@example.com", name: "Пользователь 5" }
				];

				const filteredUsers = mockUsers.filter(
					(user) =>
						user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
						user.name.toLowerCase().includes(searchQuery.toLowerCase())
				);

				return {
					options: filteredUsers.map((user) => ({
						value: user.email,
						label: user.name
					}))
				};
			}, []);

			const handleRowClick = (item: { id: string; name: string }) => {
				handleEdit(item);
			};

			return (
				<div className="container mx-auto w-[500px] py-10">
					<div className="flex gap-2">
						<h2 className="text-lg font-medium">Управление пользователями</h2>
						<span className="text-lg">
							{data.length} <span className="text-sm">/ 50</span>
						</span>
					</div>
					<div>
						<div className="flex items-center justify-between py-4">
							<div className="flex items-center gap-3">
								<Button
									variant="outline"
									className="ml-auto"
									onClick={handleAdd}
									disabled={data.length >= 50}
								>
									Добавить
								</Button>
								{selectedCount > 0 && (
									<>
										<Button status="error" onClick={handleDeleteSelected}>
											<Icon icon={Trash2} />
											Удалить ({selectedCount})
										</Button>
									</>
								)}
							</div>

							<TextInput
								className="w-[220px]"
								placeholder="Найдите пользователя..."
								value={searchQuery}
								onChange={(value) => setSearchQuery(value ?? "")}
								startIcon={<Icon icon={SearchIcon} />}
							/>
						</div>

						<div className="overflow-hidden rounded-md border">
							<Table>
								<TableHeader>
									{table.getHeaderGroups().map((headerGroup) => (
										<TableRow key={headerGroup.id}>
											{headerGroup.headers.map((header) => {
												return (
													<TableHead
														key={header.id}
														className={
															header.column.id === "select" || header.column.id === "edit"
																? "w-12"
																: "auto"
														}
													>
														{header.isPlaceholder
															? null
															: flexRender(
																	header.column.columnDef.header,
																	header.getContext()
																)}
													</TableHead>
												);
											})}
										</TableRow>
									))}
								</TableHeader>
								<TableBody>
									{table.getRowModel().rows?.length ? (
										table.getRowModel().rows.map((row) => (
											<TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
												{row.getVisibleCells().map((cell) => (
													<TableCell
														key={cell.id}
														className={
															cell.column.id === "select" || cell.column.id === "edit"
																? "w-12"
																: "auto"
														}
													>
														{flexRender(cell.column.columnDef.cell, cell.getContext())}
													</TableCell>
												))}
											</TableRow>
										))
									) : (
										<TableRow>
											<TableCell colSpan={columns.length} className="h-24 text-center">
												Пользователи не найдены.
											</TableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</div>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-4">
								<span className="text-sm text-muted-foreground">
									Показано {table.getRowModel().rows.length}/{data.length}
								</span>
							</div>
							<div className="flex items-center justify-end space-x-2 py-4">
								<Button
									variant="outline"
									size="sm"
									onClick={() => table.previousPage()}
									disabled={!table.getCanPreviousPage()}
								>
									Предыдущая
								</Button>
								<Button
									variant="outline"
									size="sm"
									onClick={() => table.nextPage()}
									disabled={!table.getCanNextPage()}
								>
									Следующая
								</Button>
							</div>
						</div>
					</div>

					<Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
						<SheetContent overlayType="transparent" side="right">
							<SheetHeader>
								<SheetTitle>
									{editingItem ? "Редактировать пользователя" : "Добавить пользователя"}
								</SheetTitle>
							</SheetHeader>
							<FormBody>
								<AsyncSearchSelect
									loadOptions={loadOptions}
									loadMode="input"
									minInputLength={1}
									placeholder="Найдите пользователя"
									searchPlaceholder="Введите имя или email"
									inputHintText="Введите минимум 1 символ для поиска"
									loadingText="Ищем пользователей..."
									emptyText="Пользователи не найдены"
									errorText="Ошибка поиска"
									value={selectedUser}
									onChange={handleUserChange}
								/>
							</FormBody>
							<SheetFooter>
								<Button type="submit" onClick={handleSave} disabled={!selectedUser}>
									{editingItem ? "Сохранить изменения" : "Добавить"}
								</Button>
								<SheetClose asChild>
									<Button variant="outline">Отмена</Button>
								</SheetClose>
							</SheetFooter>
						</SheetContent>
					</Sheet>
				</div>
			);
		}

		return <EditableTableComponent />;
	}
};

export const DraggableTableExample: Story = {
	render: () => {
		function DraggableTableComponent() {
			function getData() {
				return [
					{
						name: "John Doe"
					},
					{
						name: "Jane Smith"
					},
					{
						name: "Bob Wilson"
					},
					{
						name: "Alice Brown"
					},
					{
						name: "Charlie Davis"
					},
					{
						name: "Diana Miller"
					},
					{
						name: "Eve Johnson"
					},
					{
						name: "Frank Garcia"
					},
					{
						name: "Grace Lee"
					},
					{
						name: "Henry Taylor"
					},
					{
						name: "Iris Moore"
					},
					{
						name: "Jack White"
					},
					{
						name: "Kate Harris"
					},
					{
						name: "Leo Martin"
					}
				];
			}

			const [data, setData] = useState(() => getData());

			interface DataTableProps<TData, TValue> {
				columns: ColumnDef<TData, TValue>[];
				data: TData[];
			}

			type ValueType = {
				name: string;
			};

			function RowDraggableButton({ rowId }: { rowId: string }) {
				const { attributes, listeners } = useSortable({
					id: rowId
				});

				return <IconButton {...attributes} {...listeners} icon={GripVertical} size="sm" variant="text" />;
			}

			const columns: ColumnDef<ValueType>[] = [
				{
					id: "draggable",
					enableSorting: false,
					enableHiding: false,
					cell: ({ row }) => {
						return <RowDraggableButton rowId={row.original.name} />;
					}
				},
				{
					accessorKey: "name",
					header: "Имя",
					cell: ({ row }) => {
						return <div>{row.getValue("name")}</div>;
					}
				},
				{
					accessorKey: "actions",
					header: "",
					cell: ({ row }) => {
						return (
							<IconButton
								variant="text"
								size="sm"
								icon={Trash}
								onClick={() => DeleteRow(row.getValue("name"))}
							/>
						);
					}
				}
			];

			const dataIds = useMemo<UniqueIdentifier[]>(() => data?.map(({ name }) => name), [data]);

			function handleDragEnd(event: DragEndEvent) {
				const { active, over } = event;
				if (active && over && active.id !== over.id) {
					setData((data) => {
						const oldIndex = dataIds.indexOf(active.id);
						const newIndex = dataIds.indexOf(over.id);
						return arrayMove(data, oldIndex, newIndex);
					});
				}
			}

			function DraggableTableRow({
				row,
				children,
				state
			}: {
				row: Row<ValueType>;
				children: React.ReactNode;
				state?: string | false;
			}) {
				const { transform, transition, setNodeRef, isDragging } = useSortable({
					id: row.original.name
				});

				const style: CSSProperties = {
					transform: CSS.Transform.toString(transform),
					transition: transition,
					opacity: isDragging ? 0.8 : 1,
					zIndex: isDragging ? 1 : 0,
					position: "relative"
				};

				return (
					<TableRow ref={setNodeRef} style={style} data-state={state}>
						{children}
					</TableRow>
				);
			}

			function AddNewRow() {
				const newName = prompt("Enter new name");

				if (newName) {
					setData((prev) => [...prev, { name: newName }]);
				}
			}

			function ResetData() {
				setData(getData());
			}

			function DeleteRow(name: string) {
				setData((prev) => prev.filter((item) => item.name !== name));
			}

			function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
				const [sorting, setSorting] = React.useState<SortingState>([]);
				const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
				const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
				const [rowSelection, setRowSelection] = React.useState({});

				const table = useReactTable({
					data,
					columns,
					onSortingChange: setSorting,
					onColumnFiltersChange: setColumnFilters,
					getCoreRowModel: getCoreRowModel(),
					getSortedRowModel: getSortedRowModel(),
					getFilteredRowModel: getFilteredRowModel(),
					onColumnVisibilityChange: setColumnVisibility,
					onRowSelectionChange: setRowSelection,
					state: {
						sorting,
						columnFilters,
						columnVisibility,
						rowSelection
					}
				});

				const sensors = useSensors(
					useSensor(MouseSensor, {
						activationConstraint: {
							distance: 10
						}
					}),
					useSensor(TouchSensor, {
						activationConstraint: {
							delay: 300,
							tolerance: 5
						}
					}),
					useSensor(KeyboardSensor, {})
				);

				return (
					<DndContext
						sensors={sensors}
						collisionDetection={closestCenter}
						modifiers={[restrictToVerticalAxis]}
						onDragEnd={handleDragEnd}
					>
						<div>
							<div className="flex w-[500px] items-center justify-between gap-3 py-4">
								<Button onClick={ResetData} size="sm">
									Reset data
								</Button>
								<Button onClick={AddNewRow} size="sm" variant="outline">
									Add new row
								</Button>
							</div>

							<div className="overflow-hidden rounded-md border">
								<Table>
									<TableHeader>
										{table.getHeaderGroups().map((headerGroup) => (
											<TableRow key={headerGroup.id}>
												{headerGroup.headers.map((header) => {
													return (
														<TableHead
															key={header.id}
															className={
																header.column.id === "actions" ||
																header.column.id === "draggable"
																	? "w-6"
																	: "auto"
															}
														>
															{header.isPlaceholder
																? null
																: flexRender(
																		header.column.columnDef.header,
																		header.getContext()
																	)}
														</TableHead>
													);
												})}
											</TableRow>
										))}
									</TableHeader>
									<SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
										<TableBody>
											{table.getRowModel().rows?.length ? (
												table.getRowModel().rows.map((row) => (
													<DraggableTableRow
														key={row.id}
														row={row as Row<ValueType>}
														state={row.getIsSelected() && "selected"}
													>
														{row.getVisibleCells().map((cell) => (
															<TableCell
																key={cell.id}
																className={
																	cell.column.id === "actions" ||
																	cell.column.id === "draggable"
																		? "w-6"
																		: "auto"
																}
															>
																{flexRender(
																	cell.column.columnDef.cell,
																	cell.getContext()
																)}
															</TableCell>
														))}
													</DraggableTableRow>
												))
											) : (
												<TableRow>
													<TableCell colSpan={columns.length} className="h-24 text-center">
														No results.
													</TableCell>
												</TableRow>
											)}
										</TableBody>
									</SortableContext>
								</Table>
							</div>
						</div>
					</DndContext>
				);
			}

			return (
				<div className="container mx-auto py-10">
					<DataTable columns={columns} data={data} />
				</div>
			);
		}

		return <DraggableTableComponent />;
	}
};
