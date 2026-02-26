import type { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";

import type {
	ParametersListSchema,
	StatusParametersSchema,
} from "@/lib/state/queries/parameters/schema";

function statusBadge(s: StatusParametersSchema) {
	switch (s) {
		case 1:
			return "success";
		case 0:
			return "progress";
	}
}
function statusLabelBadge(s: StatusParametersSchema) {
	switch (s) {
		case 1:
			return "Activo";
		case 0:
			return "Inactiva";
	}
}

export const columns: ColumnDef<ParametersListSchema>[] = [
	{
		accessorKey: "name",
		header: () => {
			const t = useTranslations("parameters.table.columns");
			return <div>{t("name")}</div>;
		},
		cell: ({ row }) => (
			<div className="break-all line-clamp-2">{row.getValue("name")}</div>
		),
	},
	{
		accessorKey: "description",
		header: () => {
			const t = useTranslations("parameters.table.columns");
			return <div>{t("description")}</div>;
		},
		cell: ({ row }) => (
			<div className="break-all line-clamp-2">
				{row.getValue("description")}
			</div>
		),
	},
	{
		accessorKey: "updatedAt",
		header: () => {
			const t = useTranslations("parameters.table.columns");
			return <div>{t("updatedAt")}</div>;
		},
		cell: ({ row }) => (
			<div className="break-all line-clamp-2">{row.getValue("updatedAt")}</div>
		),
	},

	{
		accessorKey: "status",
		header: () => {
			const t = useTranslations("parameters.table.columns");
			return <div>{t("status")}</div>;
		},
		cell: ({ row }) => (
			<Badge
				className="rounded-full px-3 py-1"
				variant={statusBadge(row.original.status)}
			>
				{statusLabelBadge(row.original.status)}
			</Badge>
		),
	},
	{
		id: "actions",
		enableHiding: false,
		header: () => {
			const t = useTranslations("parameters.table.columns");
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
];
