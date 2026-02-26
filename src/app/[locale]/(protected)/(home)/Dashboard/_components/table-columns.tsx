import type { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import type {
	AlertsSchemaList,
	Priority,
} from "@/lib/state/queries/alerts/schema";
import { formatTimeAgo } from "@/lib/utils/timeAgo";

function priorityBadge(p: Priority) {
	switch (p) {
		case "CRITICAL":
			return "bg-[#FF928A66] text-[#B42318] border border-[#FF928A]";
		case "HIGH":
			return "bg-[#FFD18A66] text-[#7A4B00] border border-[#FFD18A]";
		case "MEDIUM":
			return "bg-[#FFF1A866] text-[#6B5B00] border border-[#FFF1A8]";
		case "LOW":
			return "bg-[#97C0FF66] text-[#1D4ED8] border border-[#97C0FF]";
	}
}

function priorityText(p: Priority) {
	switch (p) {
		case "CRITICAL":
			return "Crítica";
		case "HIGH":
			return "Alta";
		case "MEDIUM":
			return "Media";
		case "LOW":
			return "Baja";
	}
}

export const columns: ColumnDef<AlertsSchemaList>[] = [
	{
		accessorKey: "alert_id",
		header: () => {
			const t = useTranslations("alerts.table.columns");
			return <div>{t("id")}</div>;
		},
		cell: ({ row }) => (
			<div className="break-all line-clamp-2">{row.original.alert_id}</div>
		),
	},
	{
		accessorKey: "score",
		header: () => {
			const t = useTranslations("alerts.table.columns");
			return <div>{t("score")}</div>;
		},
		cell: ({ row }) => (
			<div className="break-all line-clamp-2">{row.original.final_score}</div>
		),
	},
	{
		accessorKey: "priority",
		header: () => {
			const t = useTranslations("alerts.table.columns");
			return <div>{t("priority")}</div>;
		},
		cell: ({ row }) => (
			<Badge
				className={[
					"rounded-full px-3 py-1",
					priorityBadge(row.original.priority),
				].join(" ")}
			>
				{priorityText(row.original.priority)}
			</Badge>
		),
	},
	{
		accessorKey: "receivedAgo",
		header: () => {
			const t = useTranslations("alerts.table.columns");
			return <div className="text-right">{t("receivedAgo")}</div>;
		},
		cell: ({ row }) => (
			<div className="text-right tabular-nums">
				{formatTimeAgo(row.original.created_at)}
			</div>
		),
	},

	{
		accessorKey: "description",
		header: () => {
			const t = useTranslations("alerts.table.columns");
			return <div>{t("description")}</div>;
		},
		cell: ({ row }) => (
			<div className="max-w-[520px] whitespace-normal leading-snug">
				{row.original.explicability}
			</div>
		),
	},
	{
		id: "actions",
		enableHiding: false,
		header: () => {
			const t = useTranslations("alerts.table.columns");
			return <div className="text-center">{t("actions")}</div>;
		},
	},
	{
		accessorKey: "id",
		header: () => null,
		cell: () => null,
		enableSorting: false,
		enableHiding: true,
	},
	{
		accessorKey: "bookmark",
		header: () => null,
		cell: () => null,
		enableSorting: false,
		enableHiding: true,
	},
];
