import {
	faAnglesLeft,
	faAnglesRight,
	faChevronLeft,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface PaginationProps {
	onClickPrevious: () => void;
	onClickNext: () => void;
	previousDisabled: boolean;
	nextDisabled: boolean;
	page: number;
	totalPages?: number;
	showTotalRows?: boolean;
	setPage: (page: number) => void;
	pageSize: string;
	setPageSize: (pageSize: string) => void;
}

const PAGE_SIZE_OPTIONS = [
	{ id: 10, name: 10 },
	{ id: 25, name: 25 },
	{ id: 50, name: 50 },
	{ id: 100, name: 100 },
];

export default function Pagination(props: PaginationProps) {
	const {
		page,
		totalPages,
		previousDisabled,
		nextDisabled,
		onClickPrevious,
		showTotalRows,
		onClickNext,
		setPage,
		pageSize,
		setPageSize,
	} = props;

	const totalPagesSafe = Math.max(1, totalPages ?? 1);

	function handleOnClickLast() {
		setPage(totalPagesSafe);
	}

	function handleOnClickFirst() {
		setPage(1);
	}

	function handleChangePageSize(value: string) {
		setPageSize(value);
		setPage(1);
	}

	return (
		<div className="flex gap-2 justify-between items-center">
			<div className="flex items-center self-start gap-2">
				{showTotalRows ? (
					<>
						<p>Mostrando</p>
						<Select onValueChange={handleChangePageSize} value={`${pageSize}`}>
							<SelectTrigger
								hideIcon
								tabIndex={0}
								className="[&_svg]:hidden h-8 w-8 px-1 rounded-none justify-center items-center"
							>
								<SelectValue />
							</SelectTrigger>
							<SelectContent className="bg-white min-w-auto items-center [&_div]:p-0">
								{PAGE_SIZE_OPTIONS.map((option) => (
									<SelectItem
										key={option.id}
										value={`${option.id}`}
										className="[&_svg]:hidden w-auto justify-center h-8 w-8"
									>
										{option.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<p>registros por página</p>
					</>
				) : (
					""
				)}
			</div>

			<div className="flex gap-2 items-center">
				<FontAwesomeIcon
					icon={faAnglesLeft}
					{...(!previousDisabled && { onClick: handleOnClickFirst })}
					className={cn("p-2", {
						"cursor-pointer text-secondary": !previousDisabled,
						"text-disabled": previousDisabled,
					})}
					aria-label="Primera página"
				/>
				<FontAwesomeIcon
					icon={faChevronLeft}
					{...(!previousDisabled && { onClick: onClickPrevious })}
					className={cn("p-2", {
						"cursor-pointer text-secondary": !previousDisabled,
						"text-disabled": previousDisabled,
					})}
					aria-label="Página anterior"
				/>

				<div className="h-8 w-8 py-2 px-1 text-sm flex items-center justify-center border border-primary bg-white">
					{page}
				</div>

				<FontAwesomeIcon
					icon={faChevronRight}
					{...(!nextDisabled && { onClick: onClickNext })}
					className={cn("p-2", {
						"cursor-pointer text-secondary": !nextDisabled,
						"text-disabled": nextDisabled,
					})}
					aria-label="Página siguiente"
				/>
				<FontAwesomeIcon
					icon={faAnglesRight}
					{...(!nextDisabled && { onClick: handleOnClickLast })}
					className={cn("p-2", {
						"cursor-pointer text-secondary": !nextDisabled,
						"text-disabled": nextDisabled,
					})}
					aria-label="Última página"
				/>

				<div>de {totalPagesSafe}</div>
			</div>
		</div>
	);
}
