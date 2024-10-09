import { useMemo } from "react";
import { Row } from "@tanstack/react-table";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { postSchema } from "../data/schema";
import { labels } from "../data/data";
import {Button} from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
	DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
// import {DropdownMenu} from '@/components/ui/dropdown-menu'
// import 	{DropdownMenuContent} from '@/components/ui/dropdown-menu-content'
// import 	{DropdownMenuItem} from '@/components/ui/dropdown-menu-item'
// import 	{DropdownMenuRadioGroup} from '@/components/ui/dropdown-menu-radio-group'
// import 	{DropdownMenuRadioItem} from '@/components/ui/dropdown-menu-radio-item'
// import 	{DropdownMenuSeparator} from '@/components/ui/dropdown-menu-separator'
// import 	{DropdownMenuSub} from '@/components/ui/dropdown-menu-sub'
// import 	{DropdownMenuSubContent} from '@/components/ui/dropdown-menu-sub-content'
// import 	{DropdownMenuSubTrigger} from '@/components/ui/dropdown-menu-sub-trigger'
// import 	{DropdownMenuTrigger} from '@/components/ui/dropdown-menu-trigger'
// import 	{DropdownMenuShortcut} from '@/components/ui/dropdown-menu-shortcut'

interface DataTableRowActionsProps<TData> {
	row: Row<TData>;
}

export default function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
	const task = useMemo(() => postSchema.parse(row.original), [row.original]);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
					<DotsHorizontalIcon className="h-4 w-4" />
					<span className="sr-only">Open menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-[160px]">
				<DropdownMenuItem>Edit</DropdownMenuItem>
				<DropdownMenuItem>Make a copy</DropdownMenuItem>
				<DropdownMenuItem>Favorite</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
					{/* <DropdownMenuSubContent>
						<DropdownMenuRadioGroup value={task.label}>
							{labels.map((label) => (
								<DropdownMenuRadioItem key={label.value} value={label.value}>
									{label.label}
								</DropdownMenuRadioItem>
							))}
						</DropdownMenuRadioGroup>
					</DropdownMenuSubContent> */}
				</DropdownMenuSub>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					Delete
					<DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
