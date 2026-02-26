"use client";

import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import * as React from "react";
import { toast } from "react-toastify";
import { WatsonChat } from "@/components/shell/WatsonChat";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import {
	useGetAlertDetails,
	useGetAlertDetailsList,
	useGetAlertScores,
} from "@/lib/state/queries/alerts";
import { useStore } from "@/lib/state/store";
import ChipRow from "./_components/chipRow";
import FieldGrid from "./_components/fieldGrid";
import FraudActionModal, {
	type FraudAction,
	type FraudModalResult,
} from "./_components/modelAction";
import AlertsDetailsTable from "./_components/table";

type KV = { label: string; value: React.ReactNode; icon?: React.ReactNode };

export default function AlertDetailLayout() {
	const router = useRouter();
	const params = useParams<{ id: string }>();
	const id = params?.id;
	const { data: session } = useSession();

	const role = session?.user?.rol;
	const isAdmin = role === "ADMIN";

	const { data: dataAlert, isLoading, isError } = useGetAlertDetails(id);
	const { data: dataScores } = useGetAlertScores(id);

	const actionMessages: Record<FraudAction, (id: string) => string> = {
		confirm: (id) => `Alerta ${id} cerrada. Se ha enviado al historial.`,

		false_positive: (id) => `Alerta ${id} cerrada. Se ha enviado al historial.`,

		release: (id) =>
			`Alerta ${id} liberada. Se ha devuelto a la cola de Alertas activas.`,
	};

	const detail = dataAlert?.result;
	const {
		alarmsDetailsList: {
			page,
			setNextPage,
			setPage,
			setPreviousPage,
			pageSize,
			setPageSize,
		},
	} = useStore();

	const filters = React.useMemo(
		() => ({
			page,
			page_size: Number.parseInt(pageSize, 10) || 10,
		}),
		[page, pageSize],
	);
	const { data: dataTable, isPending: isLoadingTable } = useGetAlertDetailsList(
		id,
		filters,
	);
	const [modalOpen, setModalOpen] = React.useState(false);
	const [modalAction, setModalAction] = React.useState<FraudAction | null>(
		null,
	);
	const [submitting, setSubmitting] = React.useState(false);

	const openModal = (action: FraudAction) => {
		setModalAction(action);
		setModalOpen(true);
	};

	const handleConfirmAction = async (payload: FraudModalResult) => {
		if (!id) return;

		try {
			setSubmitting(true);

			// Ajusta endpoint y body a tu backend real
			//   const res = await fetch(`/api/alerts/${id}/decision`, {
			//     method: "POST",
			//     headers: { "Content-Type": "application/json" },
			//     body: JSON.stringify({
			//       alertId: id,
			//       action: payload.action, // "confirm" | "false_positive" | "release"
			//       message: payload.message,
			//       status: payload.status ?? null, // solo release trae status
			//     }),
			//   });

			toast.success(actionMessages[payload.action](id));
			router.push("/");
			// Opcional: refrescar detalle / lista
			// (si usas React Query, aquí podrías invalidar queries)
			// queryClient.invalidateQueries({ queryKey: ... })
		} finally {
			setSubmitting(false);
		}
	};

	const fieldsTop: KV[] = React.useMemo(() => {
		if (!detail) return [];

		return [
			{
				label: "ID de dispositivo",
				value: detail.idDevice,
			},
			{
				label: "Dirección IP",
				value: detail.ipAddress,
			},
			{ label: "Marca", value: detail.brand },
			{ label: "Modelo", value: detail.model },
			{ label: "IP país", value: detail.ipCountry },
			{ label: "Lenguaje dispositivo", value: detail.deviceLanguage },
			{ label: "Fecha y hora", value: detail.dateTime },
			{
				label: "Importe",
				value: detail.amount,
			},
		];
	}, [detail]);

	const fieldsMid: KV[] = React.useMemo(() => {
		if (!detail) return [];

		const statusNode =
			detail.transactionStatus === "REJECTED" ? (
				<span className="text-red-600 font-medium">Rechazada</span>
			) : detail.transactionStatus === "APPROVED" ? (
				<span className="text-green-600 font-medium">Aprobada</span>
			) : (
				<span className="text-neutral-700 font-medium">Pendiente</span>
			);

		return [
			{ label: "Tipo de transacción", value: detail.transactionType },
			{ label: "Estado de transacción", value: statusNode },
			{
				label: "Nombre del cliente",
				value: detail.customerName,
			},
			{ label: "ID del cliente", value: detail.customerId },
			{
				label: "Cuenta ordenante",
				value: detail.sourceAccount,
			},
			{ label: "Nombre del beneficiario", value: detail.beneficiaryName },
			{ label: "Cuenta del beneficiario", value: detail.beneficiaryAccount },
		];
	}, [detail]);

	return (
		<div className="w-full">
			{/* Top bar interior */}
			<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<Button
					onClick={() => router.back()}
					className="text-black text-md"
					variant={"ghost"}
				>
					<ArrowLeft className="h-4 w-4" />
					Regresar lista de alertas
				</Button>

				{!isAdmin && (
					<div className="flex flex-wrap items-center justify-end gap-2 sm:gap-2">
						<Button
							className="rounded-full w-[208px]"
							variant={"danger-outline"}
							onClick={() => openModal("confirm")}
							disabled={!id || submitting}
						>
							Confirmar fraude
						</Button>

						<Button
							className="rounded-full w-[208px]"
							variant={"success-outline"}
							onClick={() => openModal("false_positive")}
							disabled={!id || submitting}
						>
							No fraude: falso positivo
						</Button>

						<Button
							className="rounded-full w-[208px]"
							variant={"outline"}
							onClick={() => openModal("release")}
							disabled={!id || submitting}
						>
							Liberar y clasificar
						</Button>
					</div>
				)}
			</div>
			<FraudActionModal
				open={modalOpen}
				action={modalAction}
				onOpenChange={setModalOpen}
				onConfirm={handleConfirmAction}
				isSubmitting={submitting}
			/>

			{/* Main grid */}
			{isLoading ? (
				<div className="mt-4 bg-white p-4 text-sm text-neutral-600">
					Cargando detalle…
				</div>
			) : isError ? (
				<div className="mt-4 bg-white p-4 text-sm text-red-600">
					Error cargando la alerta.
				</div>
			) : !detail ? (
				<div className="mt-4 bg-white p-4 text-sm text-neutral-600">
					Sin información.
				</div>
			) : (
				<div className="mt-4 grid gap-4 lg:grid-cols-[1fr_380px]">
					{/* LEFT */}
					<div className="space-y-4 min-w-0">
						<div className="bg-white p-2">
							<div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
								<div>
									<p className="text-xs text-neutral-500">Alerta ID</p>
									<p className="text-lg font-bold text-neutral-900">{id}</p>
								</div>

								<div className="min-w-0">
									<ChipRow
										label="Otras alertas relacionadas"
										values={detail.related}
									/>
								</div>
							</div>
						</div>
						<Separator className="col-span-6 mb-1 mb-1 h-[1px] bg-gray-200" />

						<FieldGrid items={fieldsTop} />
						<Separator className="col-span-6 mb-1 mb-1 h-[1px] bg-gray-200" />
						<FieldGrid items={fieldsMid} />
						<Separator className="col-span-6 mb-1 mb-10 h-[1px] bg-gray-200" />

						<div className="rounded-xl border bg-white overflow-hidden">
							<div className="overflow-auto">
								<AlertsDetailsTable
									data={dataTable?.items || []}
									isDataPending={isLoadingTable}
								/>
							</div>
						</div>
						<Pagination
							page={page}
							totalPages={dataTable?.total_pages}
							previousDisabled={dataTable?.page === 1 || !dataTable?.page}
							nextDisabled={
								dataTable?.page === dataTable?.total_pages ||
								!dataTable?.total_pages
							}
							onClickPrevious={setPreviousPage}
							onClickNext={setNextPage}
							setPage={setPage}
							showTotalRows
							pageSize={pageSize}
							setPageSize={setPageSize}
						/>
					</div>

					{/* RIGHT */}
					<div className="lg:sticky lg:top-4 h-full">
						<WatsonChat scores={dataScores?.scores} />
					</div>
				</div>
			)}
		</div>
	);
}
