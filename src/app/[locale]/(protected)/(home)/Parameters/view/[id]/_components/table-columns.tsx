import type { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import type { AlertDetailsListSchema } from "@/lib/state/queries/alerts/schema";

export const columns: ColumnDef<AlertDetailsListSchema>[] = [
	{
		accessorKey: "deviceId",
		header: () => {
			const t = useTranslations("alertsDetails.table.columns");
			return (
				<div className="truncate pr-2">
					<div>{t("deviceId")}</div>
					<div className="text-xs text-gray-400">{t("deviceCBF")}</div>
				</div>
			);
		},
		cell: ({ row }) => (
			<div className="min-w-0">
				<p className="truncate text-sm font-medium">{row.original.device_id}</p>
				<p className="text-xs text-muted-foreground truncate">
					{row.original.device_cbf}
				</p>
			</div>
		),
	},
	{
		accessorKey: "type",
		header: () => {
			const t = useTranslations("alertsDetails.table.columns");
			return <div>{t("type")}</div>;
		},
		cell: ({ row }) => (
			<div className="text-sm font-medium">{row.original.device_type}</div>
		),
	},

	{
		accessorKey: "model",
		header: () => {
			const t = useTranslations("alertsDetails.table.columns");
			return (
				<div className="truncate pr-2">
					<div>{t("model")}</div>
					<div className="text-xs text-gray-400">{t("brand")}</div>
				</div>
			);
		},
		cell: ({ row }) => (
			<div className="min-w-0">
				<p className="truncate text-sm font-medium">
					{row.original.device_model}
				</p>
				<p className="text-xs text-muted-foreground truncate">
					{row.original.device_brand}
				</p>
			</div>
		),
	},

	{
		accessorKey: "ip",
		header: () => {
			const t = useTranslations("alertsDetails.table.columns");
			return <div>{t("ip")}</div>;
		},
		cell: ({ row }) => (
			<div className="text-sm font-medium">{row.original.ip_address}</div>
		),
	},
	{
		accessorKey: "isp",
		header: () => {
			const t = useTranslations("alertsDetails.table.columns");
			return <div>{t("isp")}</div>;
		},
		cell: ({ row }) => (
			<div className="text-sm font-medium">{row.original.isp}</div>
		),
	},
	{
		accessorKey: "country",
		header: () => {
			const t = useTranslations("alertsDetails.table.columns");
			return (
				<div className="truncate pr-2">
					<div>{t("country")}</div>
					<div className="text-xs text-gray-400">{t("tz")}</div>
				</div>
			);
		},
		cell: ({ row }) => (
			<div className="break-all line-clamp-2">
				<p className="truncate text-sm font-medium">
					{row.original.ip_country}
				</p>
				<p className="text-xs text-muted-foreground truncate">
					{row.original.time_zone}
				</p>
			</div>
		),
	},
	{
		accessorKey: "lang",
		header: () => {
			const t = useTranslations("alertsDetails.table.columns");
			return <div>{t("lang")}</div>;
		},
		cell: ({ row }) => (
			<div className="break-all line-clamp-2">
				{row.original.device_language}
			</div>
		),
	},
	{
		accessorKey: "alert",
		header: () => {
			const t = useTranslations("alertsDetails.table.columns");
			return <div>{t("alert")}</div>;
		},
		cell: ({ row }) => (
			<Badge className="rounded-full px-3 py-1" variant={"outlinePrimary"}>
				{row.original.device_language}
			</Badge>
		),
	},
];
