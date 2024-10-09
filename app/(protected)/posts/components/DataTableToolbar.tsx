import { useMemo } from "react";
import { Table } from "@tanstack/react-table";
import { Cross2Icon } from "@radix-ui/react-icons";
import { priorities, statuses } from "../data/data";
import DataTableFacetedFilter from "./DataTableFacetedFilter";
import DataTableViewOptions from "./DataTableViewOptions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Search, Plus } from "lucide-react";
import APP_ROUTES from "@/const/app_routes";
import Link from "next/link";

interface DataTableToolbarProps<TData> {
	table: Table<TData>;
}

export default function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
	const isFiltered = useMemo(() => table.getState().columnFilters.length > 0, [table]);

	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-1 justify-between items-center space-x-2">
				<div className="relative">
					<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						placeholder="Filtrer"
						value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
						className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
						onChange={(e) => table.getColumn("title")?.setFilterValue(e.target.value)}
					/>
				</div>

				{/* {table.getColumn("content") && <DataTableFacetedFilter column={table.getColumn("content")} title="Status" options={statuses} />} */}
				{/* {table.getColumn("status") && <DataTableFacetedFilter column={table.getColumn("status")} title="Status" options={statuses} />}
                    {table.getColumn("priority") && <DataTableFacetedFilter column={table.getColumn("priority")} title="Priority" options={priorities} />} */}
				{isFiltered && (
					<Button variant="ghost" className="h-8 px-2 lg:px-3" onClick={() => table.resetColumnFilters()}>
						Reset
						<Cross2Icon className="ml-2 h-4 w-4" />
					</Button>
				)}
			</div>

			<div className="flex">
				<DataTableViewOptions table={table} />
				<Link href={APP_ROUTES.posts.create} className="ml-3">
					<Button >
						<Plus className="mr-2 h-4 w-4" /> Ajouter un post
					</Button>
				</Link>
			</div>
		</div>
	);
}
