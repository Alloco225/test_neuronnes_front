import React from "react";
import { ColumnDef } from "@tanstack/react-table";

import { labels, priorities, statuses } from "../data/data";
import { Post } from "../data/schema";
import DataTableColumnHeader from "./DataTableColumnHeader";
import DataTableRowActions from "./DataTableRowActions";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

export const columns = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
				className="translate-y-0.5"
			/>
		),
		cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" className="translate-y-0.5" />,
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "id",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Post" />,
		cell: ({ row }) => <div className="w-20">{row.getValue("id")}</div>,
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "title",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
		cell: ({ row }) => {

			return <Badge />;
			const label = labels.find((label) => label.value === row.original.label);

			return (
				<div className="flex space-x-2">
					{label ? <Badge variant="outline">{label.label}</Badge> : null}
					<span className="max-w-[500px] truncate font-medium">{row.getValue("title")}</span>
				</div>
			);
		},
	},
	{
		accessorKey: "content",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Titre" />,
		cell: ({ row }) => {
			return <Badge />;

			const label = labels.find((label) => label.value === row.original.label);

			return (
				<div className="flex space-x-2">
					{label ? <Badge variant="outline">{label.label}</Badge> : null}
					<span className="max-w-[500px] truncate font-medium">{row.getValue("title")}</span>
				</div>
			);
		},
	},
	
	
	{
		id: "actions",
		cell: ({ row }) => <DataTableRowActions row={row} />,
	},
];
