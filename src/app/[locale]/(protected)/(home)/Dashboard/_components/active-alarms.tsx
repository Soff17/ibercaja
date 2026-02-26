"use client";

import { useDebounce } from "@uidotdev/usehooks";
import * as React from "react";
import { type ChangeEvent, useMemo } from "react";
import { Input } from "@/components/ui/input";
import Pagination from "@/components/ui/pagination";
import { SearchField } from "@/components/ui/search-field";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useGetAreas } from "@/lib/state/queries/alerts";
import { useStore } from "@/lib/state/store";
import AlertsTable from "./table";

function toNumberOrUndefined(v: string): number | undefined {
	const n = Number.parseFloat(v.replace(",", "."));
	return Number.isFinite(n) ? n : undefined;
}

function clamp01(n: number) {
	return Math.min(1, Math.max(0, n));
}

function mapPriorityToApi(priority: string): string | undefined {
	switch (priority) {
		case "Crítica":
			return "CRITICAL";
		case "Alta":
			return "HIGH";
		case "Media":
			return "MEDIUM";
		case "Baja":
			return "LOW";
		default:
			return undefined; // "all"
	}
}

export default function ActiveAlarmsPage() {
	const {
		alarmsAdmin: {
			page,
			searchValue,
			setNextPage,
			setPage,
			setPreviousPage,
			setSearchValue,
			pageSize,
			setPageSize,
		},
	} = useStore();

	const [filterStatus, _setFilterStatus] = React.useState("-1");

	const debouncedSearch = useDebounce(searchValue || "", 500);
	const [minScore, setMinScore] = React.useState<string>("0.00");
	const [maxScore, setMaxScore] = React.useState<string>("1");
	const [priority, setPriority] = React.useState<string>("all");
	const debouncedMinScore = useDebounce(minScore, 400);
	const debouncedMaxScore = useDebounce(maxScore, 400);
	const debouncedPriority = useDebounce(priority, 300);

	const scoreFilters = useMemo(() => {
		const minN = toNumberOrUndefined(debouncedMinScore);
		const maxN = toNumberOrUndefined(debouncedMaxScore);

		const min = minN !== undefined ? clamp01(minN) : undefined;
		const max = maxN !== undefined ? clamp01(maxN) : undefined;

		if (min !== undefined && max !== undefined && min > max) {
			return { minScore: max, maxScore: min };
		}

		return { minScore: min, maxScore: max };
	}, [debouncedMinScore, debouncedMaxScore]);

	const priorityApi = useMemo(
		() => mapPriorityToApi(debouncedPriority),
		[debouncedPriority],
	);

	const filters = useMemo(
		() => ({
			page,
			page_size: Number.parseInt(pageSize, 10) || 10,
			search: debouncedSearch || undefined,
			alert_status: filterStatus || undefined,

			score_min: scoreFilters.minScore,
			score_max: scoreFilters.maxScore,
			priorities: priorityApi,
		}),
		[
			page,
			pageSize,
			debouncedSearch,
			filterStatus,
			scoreFilters.minScore,
			scoreFilters.maxScore,
			priorityApi,
		],
	);

	React.useEffect(() => {
		setPage(1);
	}, [setPage]);

	const { data: alarmsData, isPending: isUsersDataPending } =
		useGetAreas(filters);

	function handleChangeSearch(e: ChangeEvent<HTMLInputElement>) {
		setSearchValue(e.target.value);
	}
	function handleClearSearch() {
		setSearchValue("");
	}

	return (
		<div className="px-6 py-6 space-y-4">
			{/* Filters row */}
			<div className="grid grid-cols-1 lg:grid-cols-[1.6fr_.8fr_.8fr_1fr_1fr_1fr] gap-4 items-end">
				<div className="space-y-1">
					<div className="text-xs text-muted-foreground">
						Buscar por Alerta ID o explicación
					</div>
					<SearchField
						placeholder="Ej. #F-9026, intentos de cargos consecutivos"
						value={searchValue}
						onChange={handleChangeSearch}
						onClear={handleClearSearch}
						className="w-full border border-black rounded-md pr-9 text-sm text-ellipsis h-10"
						maxLength={100}
					/>
				</div>

				<div className="space-y-1">
					<div className="text-xs text-muted-foreground">Rango de score</div>
					<div className="flex gap-2">
						<Input
							value={minScore}
							onChange={(e) => setMinScore(e.target.value)}
							className="border-black"
							inputMode="decimal"
						/>
						<div className="px-1 flex items-center text-muted-foreground">
							—
						</div>
						<Input
							value={maxScore}
							onChange={(e) => setMaxScore(e.target.value)}
							className="border-black"
							inputMode="decimal"
						/>
					</div>
				</div>

				<div className="space-y-1">
					<div className="text-xs text-muted-foreground">Prioridad</div>
					<Select value={priority} onValueChange={setPriority}>
						<SelectTrigger className="border-black">
							<SelectValue placeholder="Todas las prioridades" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">Todas las prioridades</SelectItem>
							<SelectItem value="Crítica">Crítica</SelectItem>
							<SelectItem value="Alta">Alta</SelectItem>
							<SelectItem value="Media">Media</SelectItem>
							<SelectItem value="Baja">Baja</SelectItem>
						</SelectContent>
					</Select>
				</div>

				{/* spacer to match screenshot layout */}
				<div />
			</div>

			<AlertsTable
				data={alarmsData?.items || []}
				isDataPending={isUsersDataPending}
			/>
			<Pagination
				page={page}
				totalPages={alarmsData?.total_pages}
				previousDisabled={alarmsData?.page === 1 || !alarmsData?.page}
				nextDisabled={
					alarmsData?.page === alarmsData?.total_pages ||
					!alarmsData?.total_pages
				}
				onClickPrevious={setPreviousPage}
				onClickNext={setNextPage}
				setPage={setPage}
				showTotalRows
				pageSize={pageSize}
				setPageSize={setPageSize}
			/>
		</div>
	);
}
