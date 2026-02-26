import {
	faArrowDown,
	faArrowsUpDown,
	faArrowUp,
	faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
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
import { cn } from "@/lib/utils";
import { columns } from "./table-columns";

export interface AlertsTableProps {
	data: AlertsSchemaList[];
	isDataPending: boolean;

	sort: string; // ej: "created_at" | "-created_at"
	setSortBy: (value: string) => void;
}

interface RenderBodyProps {
	isPending: boolean;
	table: TableType<AlertsSchemaList>;
}
function renderBody({ isPending, table }: RenderBodyProps) {
	const router = useRouter();
	const t = useTranslations("alerts.table");

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
												{t("tooltip.view")}
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
				No hay registros.
			</TableCell>
		</TableRow>
	);
}

function nextSort(current: string, col: string) {
	if (current === col) return `-${col}`;
	if (current === `-${col}`) return col;
	return `-${col}`;
}

export default function AlertsTable(props: AlertsTableProps) {
	const { data, isDataPending, sort, setSortBy } = props;

	const sortableCols = new Set([
		"alert_id",
		"created_at",
		"final_score",
		"priority",
		"alert_status",
	]);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
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
								{headerGroup.headers.map((header) => {
									const colId = header.column.id;
									const isActions = colId === "actions";
									const isSortable = sortableCols.has(colId);

									const isAsc = sort === colId;
									const isDesc = sort === `-${colId}`;

									return (
										<TableHead
											key={header.id}
											className={cn(
												"!bg-gray-100 !text-black border-gray-300",
												{
													"w-[10%]": isActions,
												},
											)}
										>
											{header.isPlaceholder ? null : isSortable ? (
												<button
													type="button"
													className="flex w-full items-center justify-between gap-2"
													onClick={() => setSortBy(nextSort(sort, colId))}
												>
													<span>
														{flexRender(
															header.column.columnDef.header,
															header.getContext(),
														)}
													</span>
													<span className="text-neutral-500">
														{isAsc && (
															<FontAwesomeIcon
																icon={faArrowUp}
																className="h-3 w-3"
															/>
														)}
														{isDesc && (
															<FontAwesomeIcon
																icon={faArrowDown}
																className="h-3 w-3"
															/>
														)}
														{!isAsc && !isDesc && (
															<FontAwesomeIcon
																icon={faArrowsUpDown}
																className="h-3 w-3 opacity-40"
															/>
														)}
													</span>
												</button>
											) : (
												flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)
											)}
										</TableHead>
									);
								})}
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
