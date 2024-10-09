import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon, BadgeCheck, CircleIcon, Crosshair, FileArchive, StopCircle } from "lucide-react";

export const labels = [
	{
		value: "bug",
		label: "Bug",
	},
	{
		value: "feature",
		label: "Feature",
	},
	{
		value: "documentation",
		label: "Documentation",
	},
];

export const statuses = [
	{
		value: "backlog",
		label: "Backlog",
		icon: FileArchive,
	},
	{
		value: "todo",
		label: "Todo",
		icon: CircleIcon,
	},
	{
		value: "in progress",
		label: "In Progress",
		icon: StopCircle,
	},
	{
		value: "done",
		label: "Done",
		icon: BadgeCheck,
	},
	{
		value: "canceled",
		label: "Canceled",
		icon: Crosshair,
	},
];

export const priorities = [
	{
		value: "low",
		label: "Low",
		icon: ArrowDownIcon,
	},
	{
		value: "medium",
		label: "Medium",
		icon: ArrowRightIcon,
	},
	{
		value: "high",
		label: "High",
		icon: ArrowUpIcon,
	},
];
