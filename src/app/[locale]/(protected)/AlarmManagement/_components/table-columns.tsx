import type { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import type {
	AlertsSchemaList,
	Priority,
	Status,
} from "@/lib/state/queries/alerts/schema";
import { formatTimeAgo } from "@/lib/utils/timeAgo";

function statusBadge(s: Status) {
	switch (s) {
		case "ESCALATED":
			return "bg-[#8979FF66] text-[#3B2DB8] border border-[#8979FF]";
		case "IN_PROGRESS":
			return "bg-[#FFE59A66] text-[#6B5B00] border border-[#FFE59A]";
		case "CLOSED":
			return "bg-[#97C0FF66] text-[#1D4ED8] border border-[#97C0FF]";
		case "NEW":
			return "bg-[#6EE7B766] text-[#166534] border border-[#6EE7B7]";
	}
}
function statusText(s: Status) {
	switch (s) {
		case "ESCALATED":
			return "Asignada";
		case "IN_PROGRESS":
			return "Pendiente";
		case "CLOSED":
			return "Descartada";
		case "NEW":
			return "Confirmada";
	}
}

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
		id: "alert_id",
		header: () => {
			const t = useTranslations("alerts.table.columns");
			return <div>{t("id")}</div>;
		},
		cell: ({ row }) => (
			<div className="break-all line-clamp-2">{row.getValue("alert_id")}</div>
		),
	},
	{
		accessorKey: "final_score",
		id: "final_score",
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
		id: "created_at",
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
		accessorKey: "status",
		header: () => {
			const t = useTranslations("alerts.table.columns");
			return <div>{t("status")}</div>;
		},
		cell: ({ row }) => (
			<Badge
				className={[
					"rounded-full px-3 py-1",
					statusBadge(row.original.alert_status),
				].join(" ")}
			>
				{statusText(row.original.alert_status)}
			</Badge>
		),
	},
	{
		accessorKey: "assigned_user",
		header: () => {
			const t = useTranslations("alerts.table.columns");
			return <div>{t("analyst")}</div>;
		},
		cell: ({ row }) => (
			<div className="max-w-[520px] whitespace-normal leading-snug">
				{row.original.assigned_user ?? "---"}
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
];
