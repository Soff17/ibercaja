import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type Table as TableType,
	useReactTable,
} from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { AlertDetailsListSchema } from "@/lib/state/queries/alerts/schema";
import { cn } from "@/lib/utils";
import { columns } from "./table-columns";

export interface AlertsTableProps {
	data: AlertDetailsListSchema[];
	isDataPending: boolean;
}

interface RenderBodyProps {
	isPending: boolean;
	table: TableType<AlertDetailsListSchema>;
}
function renderBody({ isPending, table }: RenderBodyProps) {
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

export default function AlertsDetailsTable(props: AlertsTableProps) {
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
