import { useMemo, useState } from "react";
import { Column } from "@tanstack/react-table";
import { PlusCircledIcon, CheckIcon } from "@radix-ui/react-icons";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";


export default function DataTableFacetedFilter({ column, title, options }) {
	const facets = useMemo(() => column?.getFacetedUniqueValues(), [column]);
	const [selectedValues, setSelectedValues] = useState(new Set(column?.getFilterValue()));

	const handleSelect = (optionValue) => {
		const newSelectedValues = new Set(selectedValues);
		if (newSelectedValues.has(optionValue)) {
			newSelectedValues.delete(optionValue);
		} else {
			newSelectedValues.add(optionValue);
		}
		const filterValues = Array.from(newSelectedValues);
		column?.setFilterValue(filterValues.length ? filterValues : undefined);
		setSelectedValues(newSelectedValues);
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" size="sm" className="h-8 border-dashed">
					<PlusCircledIcon className="mr-2 h-4 w-4" />
					{title}
					{selectedValues.size > 0 && (
						<>
							<Separator orientation="vertical" className="mx-2 h-4" />
							<Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
								{selectedValues.size}
							</Badge>
							<div className="hidden space-x-1 lg:flex">
								{selectedValues.size > 2 ? (
									<Badge variant="secondary" className="rounded-sm px-1 font-normal">
										{selectedValues.size} selected
									</Badge>
								) : (
									options
										.filter((option) => selectedValues.has(option.value))
										.map((option) => (
											<Badge key={option.value} variant="secondary" className="rounded-sm px-1 font-normal">
												{option.label}
											</Badge>
										))
								)}
							</div>
						</>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0" align="start">
				<Command filterFunction={(list, term) => list.filter((i) => i.label.toLowerCase().includes(term))}>
					<CommandInput placeholder={title} />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup>
							{options.map((option) => (
								// <CommandItem key={option.value} value={option} onSelect={() => handleSelect(option.value)}>
								<CommandItem key={option.value} >
									<div
										className={cn(
											"mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
											selectedValues.has(option.value) ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible"
										)}>
										<CheckIcon className="h-4 w-4" />
									</div>
									{option.icon && <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
									<span>{option.label}</span>
									{facets?.get(option.value) && <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">{facets.get(option.value)}</span>}
								</CommandItem>
							))}
						</CommandGroup>
						{selectedValues.size > 0 && (
							<>
								<CommandSeparator />
								<CommandGroup>
									{/* <CommandItem value={{ label: "Clear filters" }} className="justify-center text-center" onSelect={() => column?.setFilterValue(undefined)}> */}
									<CommandItem className="justify-center text-center" onSelect={() => column?.setFilterValue(undefined)}>
										Clear filters
									</CommandItem>
								</CommandGroup>
							</>
						)}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
