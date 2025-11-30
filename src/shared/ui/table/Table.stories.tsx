import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Check, X, MoreHorizontal, ArrowUpDown, Eye, Edit, Trash2 } from "lucide-react";
import { Badge } from "../badge/Badge";
import { Button } from "../button/button/Button";
import { IconButton } from "../button/icon-button/IconButton";
import { Checkbox } from "../checkbox/Checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../dropdown";
import { Icon } from "../icon/Icon";
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption } from "./Table";

const meta: Meta<typeof Table> = {
	component: Table,
	parameters: {
		layout: "centered"
	},
	tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
	render: () => (
		<Table>
			<TableCaption>List of recent invoices</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">Invoice</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Method</TableHead>
					<TableHead className="text-right">Amount</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell className="font-medium">INV001</TableCell>
					<TableCell>Paid</TableCell>
					<TableCell>Credit Card</TableCell>
					<TableCell className="text-right">$250.00</TableCell>
				</TableRow>
				<TableRow>
					<TableCell className="font-medium">INV002</TableCell>
					<TableCell>Pending</TableCell>
					<TableCell>PayPal</TableCell>
					<TableCell className="text-right">$150.00</TableCell>
				</TableRow>
				<TableRow>
					<TableCell className="font-medium">INV003</TableCell>
					<TableCell>Unpaid</TableCell>
					<TableCell>Bank Transfer</TableCell>
					<TableCell className="text-right">$350.00</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	)
};

export const WithCheckboxes: Story = {
	render: () => {
		function WithCheckboxesComponent() {
			const users = [
				{ id: "1", name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
				{ id: "2", name: "Jane Smith", email: "jane@example.com", role: "User", status: "Pending" },
				{ id: "3", name: "Bob Johnson", email: "bob@example.com", role: "Editor", status: "Inactive" }
			];

			const [selectedRows, setSelectedRows] = useState<string[]>([]);

			const isAllSelected = selectedRows.length === users.length;
			const isIndeterminate = selectedRows.length > 0 && selectedRows.length < users.length;

			const toggleAll = () => {
				if (isAllSelected) {
					setSelectedRows([]);
				} else {
					setSelectedRows(users.map((user) => user.id));
				}
			};

			const toggleRow = (id: string) => {
				setSelectedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]));
			};

			return (
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>
								<Checkbox
									checked={isIndeterminate ? "indeterminate" : isAllSelected}
									className="inline-block"
									onCheckedChange={toggleAll}
								/>
							</TableHead>
							<TableHead>Name</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Role</TableHead>
							<TableHead>Status</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{users.map((user) => (
							<TableRow
								key={user.id}
								data-state={selectedRows.includes(user.id) ? "selected" : undefined}
							>
								<TableCell>
									<Checkbox
										checked={selectedRows.includes(user.id)}
										className="inline-block"
										onCheckedChange={() => toggleRow(user.id)}
									/>
								</TableCell>
								<TableCell className="font-medium">{user.name}</TableCell>
								<TableCell>{user.email}</TableCell>
								<TableCell>{user.role}</TableCell>
								<TableCell>
									<Badge
										status={
											user.status === "Active"
												? "success"
												: user.status === "Pending"
													? "warning"
													: "error"
										}
										size="sm"
									>
										{user.status === "Active" && <Icon icon={Check} />}
										{user.status === "Inactive" && <Icon icon={X} />}
										{user.status}
									</Badge>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			);
		}

		return <WithCheckboxesComponent />;
	}
};

export const WithActions: Story = {
	render: () => (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Product</TableHead>
					<TableHead>Category</TableHead>
					<TableHead>Price</TableHead>
					<TableHead>Stock</TableHead>
					<TableHead className="text-right">Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell className="font-medium">MacBook Pro</TableCell>
					<TableCell>Laptops</TableCell>
					<TableCell>$2,499.00</TableCell>
					<TableCell>12</TableCell>
					<TableCell className="text-right">
						<div className="flex justify-end gap-2">
							<IconButton variant="ghost" size="sm" icon={Eye} />
							<IconButton variant="ghost" size="sm" icon={Edit} />
							<IconButton variant="ghost" size="sm" icon={Trash2} />
						</div>
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell className="font-medium">iPhone 15</TableCell>
					<TableCell>Phones</TableCell>
					<TableCell>$999.00</TableCell>
					<TableCell>25</TableCell>
					<TableCell className="text-right">
						<div className="flex justify-end gap-2">
							<IconButton variant="ghost" size="sm" icon={Eye} />
							<IconButton variant="ghost" size="sm" icon={Edit} />
							<IconButton variant="ghost" size="sm" icon={Trash2} />
						</div>
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell className="font-medium">AirPods Pro</TableCell>
					<TableCell>Audio</TableCell>
					<TableCell>$249.00</TableCell>
					<TableCell>8</TableCell>
					<TableCell className="text-right">
						<div className="flex justify-end gap-2">
							<IconButton variant="ghost" size="sm" icon={Eye} />
							<IconButton variant="ghost" size="sm" icon={Edit} />
							<IconButton variant="ghost" size="sm" icon={Trash2} />
						</div>
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	)
};

export const WithDropdownMenu: Story = {
	render: () => (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Project</TableHead>
					<TableHead>Owner</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Last Updated</TableHead>
					<TableHead className="w-[70px]"></TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell className="font-medium">Website Redesign</TableCell>
					<TableCell>Alice Cooper</TableCell>
					<TableCell>
						<Badge status="info" size="sm">
							In Progress
						</Badge>
					</TableCell>
					<TableCell>2 hours ago</TableCell>
					<TableCell>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<IconButton variant="ghost" size="sm" icon={MoreHorizontal} />
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem>
									<Icon icon={Eye} />
									View
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Icon icon={Edit} />
									Edit
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Icon icon={Trash2} />
									Delete
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell className="font-medium">Mobile App</TableCell>
					<TableCell>Bob Wilson</TableCell>
					<TableCell>
						<Badge status="success" size="sm">
							<Icon icon={Check} />
							Completed
						</Badge>
					</TableCell>
					<TableCell>1 day ago</TableCell>
					<TableCell>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<IconButton variant="ghost" size="sm" icon={MoreHorizontal} />
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem>
									<Icon icon={Eye} />
									View
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Icon icon={Edit} />
									Edit
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Icon icon={Trash2} />
									Delete
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	)
};

export const WithSortableHeaders: Story = {
	render: () => (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>
						<Button variant="ghost" size="sm" endIcon={ArrowUpDown} className="h-8 px-2">
							Name
						</Button>
					</TableHead>
					<TableHead>
						<Button variant="ghost" size="sm" endIcon={ArrowUpDown} className="h-8 px-2">
							Email
						</Button>
					</TableHead>
					<TableHead>
						<Button variant="ghost" size="sm" endIcon={ArrowUpDown} className="h-8 px-2">
							Created
						</Button>
					</TableHead>
					<TableHead className="text-right">
						<Button variant="ghost" size="sm" endIcon={ArrowUpDown} className="h-8 px-2">
							Amount
						</Button>
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell className="font-medium">John Doe</TableCell>
					<TableCell>john@example.com</TableCell>
					<TableCell>2024-01-15</TableCell>
					<TableCell className="text-right">$1,234.56</TableCell>
				</TableRow>
				<TableRow>
					<TableCell className="font-medium">Jane Smith</TableCell>
					<TableCell>jane@example.com</TableCell>
					<TableCell>2024-01-14</TableCell>
					<TableCell className="text-right">$987.65</TableCell>
				</TableRow>
				<TableRow>
					<TableCell className="font-medium">Bob Johnson</TableCell>
					<TableCell>bob@example.com</TableCell>
					<TableCell>2024-01-13</TableCell>
					<TableCell className="text-right">$2,345.67</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	)
};

export const WithFooter: Story = {
	render: () => (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Item</TableHead>
					<TableHead>Quantity</TableHead>
					<TableHead>Price</TableHead>
					<TableHead className="text-right">Total</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell className="font-medium">Product A</TableCell>
					<TableCell>2</TableCell>
					<TableCell>$50.00</TableCell>
					<TableCell className="text-right">$100.00</TableCell>
				</TableRow>
				<TableRow>
					<TableCell className="font-medium">Product B</TableCell>
					<TableCell>1</TableCell>
					<TableCell>$75.00</TableCell>
					<TableCell className="text-right">$75.00</TableCell>
				</TableRow>
				<TableRow>
					<TableCell className="font-medium">Product C</TableCell>
					<TableCell>3</TableCell>
					<TableCell>$25.00</TableCell>
					<TableCell className="text-right">$75.00</TableCell>
				</TableRow>
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={3}>Total</TableCell>
					<TableCell className="text-right font-medium">$250.00</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	)
};

export const LargeDataExample: Story = {
	render: () => {
		const LargeDataExampleComponent = () => {
			const employees = [
				{
					id: "1",
					name: "Alice Johnson",
					department: "Engineering",
					position: "Senior Developer",
					salary: "$120,000",
					status: "Active"
				},
				{
					id: "2",
					name: "Bob Smith",
					department: "Marketing",
					position: "Marketing Manager",
					salary: "$85,000",
					status: "Active"
				},
				{
					id: "3",
					name: "Carol Davis",
					department: "HR",
					position: "HR Specialist",
					salary: "$65,000",
					status: "On Leave"
				},
				{
					id: "4",
					name: "David Wilson",
					department: "Engineering",
					position: "Lead Engineer",
					salary: "$140,000",
					status: "Active"
				},
				{
					id: "5",
					name: "Emma Brown",
					department: "Sales",
					position: "Sales Representative",
					salary: "$55,000",
					status: "Active"
				},
				{
					id: "6",
					name: "Frank Miller",
					department: "Finance",
					position: "Financial Analyst",
					salary: "$70,000",
					status: "Inactive"
				},
				{
					id: "7",
					name: "Grace Lee",
					department: "Design",
					position: "UX Designer",
					salary: "$95,000",
					status: "Active"
				},
				{
					id: "8",
					name: "Henry Taylor",
					department: "Engineering",
					position: "DevOps Engineer",
					salary: "$110,000",
					status: "Active"
				}
			];

			const [selectedRows, setSelectedRows] = useState<string[]>([]);

			const isAllSelected = selectedRows.length === employees.length;
			const isIndeterminate = selectedRows.length > 0 && selectedRows.length < employees.length;

			const toggleAll = () => {
				if (isAllSelected) {
					setSelectedRows([]);
				} else {
					setSelectedRows(employees.map((employee) => employee.id));
				}
			};

			const toggleRow = (id: string) => {
				setSelectedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]));
			};

			return (
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>
								<Checkbox
									checked={isIndeterminate ? "indeterminate" : isAllSelected}
									onCheckedChange={toggleAll}
								/>
							</TableHead>
							<TableHead>ID</TableHead>
							<TableHead>Name</TableHead>
							<TableHead>Department</TableHead>
							<TableHead>Position</TableHead>
							<TableHead>Salary</TableHead>
							<TableHead>Status</TableHead>
							<TableHead className="w-[70px]"></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{employees.map((employee) => (
							<TableRow
								key={employee.id}
								data-state={selectedRows.includes(employee.id) ? "selected" : undefined}
							>
								<TableCell>
									<Checkbox
										checked={selectedRows.includes(employee.id)}
										onCheckedChange={() => toggleRow(employee.id)}
									/>
								</TableCell>
								<TableCell className="font-medium">{employee.id}</TableCell>
								<TableCell>{employee.name}</TableCell>
								<TableCell>{employee.department}</TableCell>
								<TableCell>{employee.position}</TableCell>
								<TableCell>{employee.salary}</TableCell>
								<TableCell>
									<Badge
										status={
											employee.status === "Active"
												? "success"
												: employee.status === "On Leave"
													? "warning"
													: "error"
										}
										size="sm"
									>
										{employee.status === "Active" && <Icon icon={Check} />}
										{employee.status === "Inactive" && <Icon icon={X} />}
										{employee.status}
									</Badge>
								</TableCell>
								<TableCell>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<IconButton variant="ghost" size="sm" icon={MoreHorizontal} />
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuItem>
												<Icon icon={Eye} />
												View Details
											</DropdownMenuItem>
											<DropdownMenuItem>
												<Icon icon={Edit} />
												Edit Employee
											</DropdownMenuItem>
											<DropdownMenuItem>
												<Icon icon={Trash2} />
												Remove
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			);
		};

		return <LargeDataExampleComponent />;
	}
};

export const ScrollableTable: Story = {
	render: () => {
		const ScrollableTableComponent = () => {
			const products = [
				{ id: 1, name: "MacBook Pro 16-inch", category: "Laptops", price: "$2,499", stock: 12, rating: 4.8 },
				{ id: 2, name: "iPhone 15 Pro", category: "Phones", price: "$999", stock: 25, rating: 4.7 },
				{ id: 3, name: "AirPods Pro", category: "Audio", price: "$249", stock: 8, rating: 4.6 },
				{ id: 4, name: "iPad Air", category: "Tablets", price: "$599", stock: 15, rating: 4.5 },
				{ id: 5, name: "Apple Watch Series 9", category: "Wearables", price: "$399", stock: 20, rating: 4.4 },
				{ id: 6, name: "Mac Studio", category: "Desktops", price: "$1,999", stock: 5, rating: 4.9 },
				{ id: 7, name: "Studio Display", category: "Monitors", price: "$1,599", stock: 10, rating: 4.3 },
				{ id: 8, name: "Magic Keyboard", category: "Accessories", price: "$99", stock: 30, rating: 4.2 },
				{ id: 9, name: "Magic Mouse", category: "Accessories", price: "$79", stock: 25, rating: 4.1 },
				{ id: 10, name: "HomePod mini", category: "Audio", price: "$99", stock: 18, rating: 4.0 },
				{ id: 11, name: "Apple TV 4K", category: "Streaming", price: "$129", stock: 12, rating: 4.3 },
				{ id: 12, name: "AirTag 4-pack", category: "Accessories", price: "$99", stock: 22, rating: 4.5 },
				{ id: 13, name: "Lightning Cable", category: "Accessories", price: "$19", stock: 50, rating: 3.8 },
				{ id: 14, name: "USB-C Cable", category: "Accessories", price: "$19", stock: 45, rating: 3.9 },
				{ id: 15, name: "MagSafe Charger", category: "Accessories", price: "$39", stock: 35, rating: 4.2 }
			];

			return (
				<div className="w-full max-w-4xl rounded-lg border">
					<Table>
						<TableHeader className="block">
							<TableRow className="grid grid-cols-[50px_repeat(6,1fr)] gap-1">
								<TableHead className="flex items-center">ID</TableHead>
								<TableHead className="flex items-center">Product Name</TableHead>
								<TableHead className="flex items-center">Category</TableHead>
								<TableHead className="flex items-center">Price</TableHead>
								<TableHead className="flex items-center">Stock</TableHead>
								<TableHead className="flex items-center">Rating</TableHead>
								<TableHead className="flex items-center">Status</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody className="block max-h-96 overflow-y-auto">
							{products.map((product) => (
								<TableRow key={product.id} className="grid grid-cols-[50px_repeat(6,1fr)] gap-1">
									<TableCell>{product.id}</TableCell>
									<TableCell>{product.name}</TableCell>
									<TableCell>{product.category}</TableCell>
									<TableCell>{product.price}</TableCell>
									<TableCell>{product.stock}</TableCell>
									<TableCell>{product.rating}</TableCell>
									<TableCell>
										<Badge
											status={
												product.stock > 20
													? "success"
													: product.stock > 10
														? "warning"
														: "error"
											}
											size="sm"
										>
											{product.stock > 20
												? "In Stock"
												: product.stock > 10
													? "Low Stock"
													: "Out of Stock"}
										</Badge>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			);
		};

		return <ScrollableTableComponent />;
	}
};

export const EmptyState: Story = {
	render: () => (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>Email</TableHead>
					<TableHead>Role</TableHead>
					<TableHead>Status</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell colSpan={4} className="py-8 text-center text-muted-foreground">
						No data available
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	)
};
