import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import {
	faBookmark as faBookmarkSolid,
	faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type Table as TableType,
	useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import type { AlertsSchemaList } from "@/lib/state/queries/alerts/schema";
import { useAlarmBookmarks } from "@/lib/state/store/alarms/bookmarks";
import { cn } from "@/lib/utils";
import { columns } from "./table-columns";

export interface AlertsTableProps {
	data: AlertsSchemaList[];
	isDataPending: boolean;
}

interface RenderBodyProps {
	isPending: boolean;
	table: TableType<AlertsSchemaList>;
}
function renderBody({ isPending, table }: RenderBodyProps) {
	const router = useRouter();
	const t = useTranslations("alerts.table");
	const { toggleBookmark } = useAlarmBookmarks();

	if (isPending) {
		return (
			<TableRow>
				<TableCell colSpan={columns.length}>
					<div className="flex flex-col items-center justify-center h-64">
						<p className="mt-4 text-sm text-gray-600">{t("loadingText")}</p>
					</div>
				</TableCell>
			</TableRow>
		);
	}
	if (table.getRowModel().rows?.length) {
		return table.getRowModel().rows.map((row) => (
			<TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
				{row.getVisibleCells().map((cell) => {
					if (cell.column?.id === "actions") {
						const idForRoute = row.getValue("alert_id") as string;
						const id = row.getValue("id") as number;
						const bookmarked = row.getValue("bookmark") as boolean;

						return (
							<TableCell key={cell.id}>
								<div className="flex gap-5 justify-center">
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger asChild>
												<span>
													<FontAwesomeIcon
														icon={faEye}
														className="text-primary cursor-pointer"
														size="lg"
														onClick={() =>
															router.push(`/AlarmManagement/${idForRoute}`)
														}
													/>
												</span>
											</TooltipTrigger>
											<TooltipContent className="bg-black text-white px-2 py-1 rounded-md text-sm">
												{t("tooltip.assignMe")}
											</TooltipContent>
										</Tooltip>
										{/* Bookmark */}
										<Tooltip>
											<TooltipTrigger asChild>
												<span>
													<FontAwesomeIcon
														icon={
															bookmarked ? faBookmarkSolid : faBookmarkRegular
														}
														className="text-primary cursor-pointer"
														size="lg"
														onClick={(e) => {
															e.preventDefault();
															e.stopPropagation();
															toggleBookmark(id);
														}}
													/>
												</span>
											</TooltipTrigger>
											<TooltipContent className="bg-black text-white px-2 py-1 rounded-md text-sm">
												{bookmarked
													? t("tooltip.unbookmark")
													: t("tooltip.bookmark")}
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</div>
							</TableCell>
						);
					}
					return (
						<TableCell key={cell.id}>
							{flexRender(cell.column.columnDef.cell, cell.getContext())}
						</TableCell>
					);
				})}
			</TableRow>
		));
	}
	return (
		<TableRow>
			<TableCell colSpan={columns.length} className="h-24 text-center">
				No hay alarmas.
			</TableCell>
		</TableRow>
	);
}

export default function AlertsTable(props: AlertsTableProps) {
	const { data, isDataPending } = props;

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		manualPagination: true,
	});

	return (
		<div className="rounded-2xl border bg-white overflow-hidden">
			<div className="flex flex-col gap-10">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead
										key={header.id}
										className={cn("!bg-gray-100 !text-black border-gray-300", {
											"w-[10%]": header.id === "actions",
										})}
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{renderBody({
							isPending: isDataPending,
							table,
						})}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
