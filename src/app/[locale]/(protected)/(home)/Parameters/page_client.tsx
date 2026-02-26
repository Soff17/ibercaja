"use client";

import { X } from "lucide-react";

import * as React from "react";
import { Button } from "@/components/ui/button";

import { useGetParametersList } from "@/lib/state/queries/parameters";
import ParametersTable from "./_components/table";

function InfoBanner({ onClose }: { onClose: () => void }) {
	return (
		<div className="rounded-xl border border-blue-300 bg-blue-50 p-5 flex items-start justify-between gap-4">
			<div>
				<h2 className="text-xl font-semibold text-blue-800">
					¿Para qué sirve este ajuste?
				</h2>
				<p className="mt-2 text-sm text-neutral-700 max-w-4xl">
					Aquí puedes consultar los tests de ajuste de parámetros creados
					anteriormente. Selecciona uno para editar sus valores o eliminarlo si
					ya no es necesario.
				</p>
			</div>

			<button
				type="button"
				onClick={onClose}
				aria-label="Cerrar"
				className="h-9 w-9 rounded-full flex items-center justify-center hover:bg-blue-100 transition"
			>
				<X className="h-5 w-5 text-blue-700" />
			</button>
		</div>
	);
}

export default function AjusteParametrosPageClient() {
	const [bannerOpen, setBannerOpen] = React.useState(true);
	const { data: ParametersData, isPending: isParametersDataPending } =
		useGetParametersList();

	return (
		<main className="px-6 py-6">
			<div className="flex items-start justify-between gap-4">
				{bannerOpen ? (
					<div className="flex-1 min-w-0">
						<InfoBanner onClose={() => setBannerOpen(false)} />
					</div>
				) : (
					<div className="flex-1" />
				)}

				<Button className="h-11 px-6 rounded-full bg-blue-600 hover:bg-blue-700">
					Nueva configuración
				</Button>
			</div>

			<div className="mt-6 rounded-xl border bg-white overflow-hidden">
				<ParametersTable
					data={ParametersData?.result || []}
					isDataPending={isParametersDataPending}
				/>
			</div>
			{/* <Pagination
						page={page}
						totalPages={alarmsData?.paging.totalPages}
						previousDisabled={
							alarmsData?.paging.currentPage === 1 ||
							!alarmsData?.paging.currentPage
						}
						nextDisabled={
							alarmsData?.paging.currentPage === alarmsData?.paging.totalPages ||
							!alarmsData?.paging.totalPages
						}
						onClickPrevious={setPreviousPage}
						onClickNext={setNextPage}
						setPage={setPage}
						showTotalRows
						pageSize={pageSize}
						setPageSize={setPageSize}
					/> */}
		</main>
	);
}
