import { useMemo } from "react";
import { Table } from "@tanstack/react-table";
import { Cross2Icon } from "@radix-ui/react-icons";
import { priorities, statuses } from "../data/data";
import DataTableFacetedFilter from "./DataTableFacetedFilter";
import DataTableViewOptions from "./DataTableViewOptions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DataTableToolbarProps<TData> {
	table: Table<TData>;
}

export default function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
	const isFiltered = useMemo(() => table.getState().columnFilters.length > 0, [table]);

	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-1 items-center space-x-2">
				<Input
					placeholder="Filter tasks..."
					value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
					className="h-8 w-[150px] lg:w-[250px]"
					onChange={(e) => table.getColumn("title")?.setFilterValue(e.target.value)}
				/>
				{table.getColumn("status") && <DataTableFacetedFilter column={table.getColumn("status")} title="Status" options={statuses} />}
				{table.getColumn("priority") && <DataTableFacetedFilter column={table.getColumn("priority")} title="Priority" options={priorities} />}
				{isFiltered && (
					<Button variant="ghost" className="h-8 px-2 lg:px-3" onClick={() => table.resetColumnFilters()}>
						Reset
						<Cross2Icon className="ml-2 h-4 w-4" />
					</Button>
				)}
			</div>
			<DataTableViewOptions table={table} />
		</div>
	);
}
