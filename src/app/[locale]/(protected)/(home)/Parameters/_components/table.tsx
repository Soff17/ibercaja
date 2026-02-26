import { faEye, faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
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
import type { ParametersListSchema } from "@/lib/state/queries/parameters/schema";
import { cn } from "@/lib/utils";
import { columns } from "./table-columns";

export interface AlertsTableProps {
	data: ParametersListSchema[];
	isDataPending: boolean;
}

interface RenderBodyProps {
	isPending: boolean;
	table: TableType<ParametersListSchema>;
}
function renderBody({ isPending, table }: RenderBodyProps) {
	const router = useRouter();
	const t = useTranslations("parameters.table");

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
						const rawId = row.getValue("id") as string;

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
															router.push(`/Parameters/view/${rawId}`)
														}
													/>
												</span>
											</TooltipTrigger>
											<TooltipContent className="bg-black text-white px-2 py-1 rounded-md text-sm">
												{t("tooltip.view")}
											</TooltipContent>
										</Tooltip>
										<Tooltip>
											<TooltipTrigger asChild>
												<span>
													<FontAwesomeIcon
														icon={faPencil}
														className="text-primary cursor-pointer"
														size="lg"
														onClick={() =>
															router.push(`/Parameters/edit/${rawId}`)
														}
													/>
												</span>
											</TooltipTrigger>
											<TooltipContent className="bg-black text-white px-2 py-1 rounded-md text-sm">
												{t("tooltip.edit")}
											</TooltipContent>
										</Tooltip>
										<Tooltip>
											<TooltipTrigger asChild>
												<span>
													<FontAwesomeIcon
														icon={faTrashCan}
														className="text-red-500 cursor-pointer"
														size="lg"
														// onClick={() =>
														// 	router.push(`/AlarmManagement/${rawId}`)
														// }
													/>
												</span>
											</TooltipTrigger>
											<TooltipContent className="bg-black text-white px-2 py-1 rounded-md text-sm">
												{t("tooltip.delete")}
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
				No hay áreas.
			</TableCell>
		</TableRow>
	);
}

export default function ParametersTable(props: AlertsTableProps) {
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
