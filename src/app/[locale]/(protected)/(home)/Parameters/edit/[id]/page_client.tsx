"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Pagination from "@/components/ui/pagination";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useStore } from "@/lib/state/store";
import CancelChangesModal from "./_components/CancelChangesModal";
import { ParametersHeaderForm } from "./_components/ParametersHeaderForm";
import SaveChangesModal, {
	type ChangeRow,
} from "./_components/SaveChangesModal";

type ParamRow =
	| {
			id: string;
			name: string;
			secondary: string;
			description: string;
			type: "slider";
			weight: number; // -100..100
			enabled: boolean;
	  }
	| {
			id: string;
			name: string;
			secondary: string;
			description: string;
			type: "input";
			value: string;
			enabled: boolean;
	  };

const initialRows: ParamRow[] = [
	{
		id: "amount_min",
		name: "Amount",
		secondary: "Importe mínimo para la priorización de la operación",
		description:
			"Evalúa qué tan diferente es una operación respecto a patrones habituales.",
		type: "input",
		value: "",
		enabled: true,
	},
	{
		id: "anomaly_score",
		name: "Anomaly_score",
		secondary: "Comportamiento inusual",
		description:
			"Evalúa qué tan diferente es una operación respecto a patrones habituales.",
		type: "slider",
		weight: 0,
		enabled: true,
	},
	{
		id: "rules_score",
		name: "Rules_score",
		secondary: "Reglas de seguridad",
		description:
			"Evalúa qué tan diferente es una operación respecto a patrones habituales.",
		type: "slider",
		weight: 10,
		enabled: true,
	},
	{
		id: "profile_deviation_score",
		name: "Profile_deviation_score",
		secondary: "Desviación del perfil",
		description:
			"Evalúa qué tan diferente es una operación respecto a patrones habituales.",
		type: "slider",
		weight: -5,
		enabled: true,
	},
	{
		id: "amount_score",
		name: "Amount_score",
		secondary: "Importe de la operación",
		description:
			"Evalúa qué tan diferente es una operación respecto a patrones habituales.",
		type: "slider",
		weight: 12,
		enabled: true,
	},
	{
		id: "velocity_score",
		name: "Velocity_score",
		secondary: "Frecuencia de actividad",
		description:
			"Evalúa qué tan diferente es una operación respecto a patrones habituales.",
		type: "slider",
		weight: 8,
		enabled: true,
	},
	{
		id: "device_ip_risk_score",
		name: "Device_ip_risk_score",
		secondary: "Riesgo de dispositivo y ubicación",
		description:
			"Evalúa qué tan diferente es una operación respecto a patrones habituales.",
		type: "slider",
		weight: 3,
		enabled: true,
	},
	{
		id: "confidence",
		name: "Confidence",
		secondary: "Nivel de confianza del modelo",
		description:
			"Evalúa qué tan diferente es una operación respecto a patrones habituales.",
		type: "slider",
		weight: 0,
		enabled: true,
	},
];

function clamp(n: number, min: number, max: number) {
	return Math.min(max, Math.max(min, n));
}

function isNotNull<T>(v: T | null): v is T {
	return v !== null;
}

export default function ParametersInner() {
	const [name, setName] = React.useState("Soporte técnico falso");
	const [description, setDescription] = React.useState(
		"Configuración base utilizada para el cálculo general de rubros.",
	);

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

	const router = useRouter();
	const [openCancel, setOpenCancel] = React.useState(false);
	const [rows, setRows] = React.useState<ParamRow[]>(initialRows);

	const [openSave, setOpenSave] = React.useState(false);
	const [isSaving, setIsSaving] = React.useState(false);

	const initialRowsRef = React.useRef(rows);

	const changes = React.useMemo<ChangeRow[]>(() => {
		const prev = initialRowsRef.current;

		return rows
			.map((r) => {
				const p = prev.find((x) => x.id === r.id);
				if (!p) return null;

				const changed =
					r.enabled !== p.enabled ||
					(r.type === "slider" && p.type === "slider" && r.weight !== p.weight);

				if (!changed) return null;

				return {
					id: r.id,
					name: r.name,
					enabledPrev: p.enabled,
					enabledNew: r.enabled,
					weightPrev: p.type === "slider" ? (p.weight ?? null) : null,
					weightNew: r.type === "slider" ? (r.weight ?? null) : null,
				};
			})
			.filter(isNotNull);
	}, [rows]);

	// UI paging (maqueta)
	const total = rows.length;
	const perPage = Number(pageSize);
	const totalPages = Math.max(1, Math.ceil(total / perPage));
	const safePage = clamp(page, 1, totalPages);

	const pageRows = rows.slice((safePage - 1) * perPage, safePage * perPage);

	const setEnabled = (id: string, enabled: boolean) => {
		setRows((prev) =>
			prev.map((r) => (r.id === id ? ({ ...r, enabled } as ParamRow) : r)),
		);
	};

	const setWeight = (id: string, weight: number) => {
		setRows((prev) =>
			prev.map((r) =>
				r.id === id && r.type === "slider" ? ({ ...r, weight } as ParamRow) : r,
			),
		);
	};

	const setValue = (id: string, value: string) => {
		setRows((prev) =>
			prev.map((r) =>
				r.id === id && r.type === "input" ? ({ ...r, value } as ParamRow) : r,
			),
		);
	};

	return (
		<div className="w-full">
			<div className="flex items-center gap-2 text-sm text-muted-foreground">
				<Button
					onClick={() => router.back()}
					className="text-black text-md"
					variant={"ghost"}
				>
					<ArrowLeft className="h-4 w-4" />
					Regresar
				</Button>
			</div>

			<div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between" />

			<ParametersHeaderForm
				name={name}
				description={description}
				onChangeName={setName}
				onChangeDescription={setDescription}
				onSave={() => setOpenSave(true)}
				onCancel={() => setOpenCancel(true)}
			/>

			<CancelChangesModal
				open={openCancel}
				onOpenChange={setOpenCancel}
				onStayEditing={() => {}}
				onExitWithoutSaving={() => {
					toast.error("Cambios descartados");
					router.push("/Parameters");
				}}
			/>

			<SaveChangesModal
				open={openSave}
				onOpenChange={setOpenSave}
				changes={changes}
				onCancel={() => {}}
				isSubmitting={isSaving}
				onConfirmSave={async () => {
					setIsSaving(true);
					try {
						initialRowsRef.current = rows;
					} finally {
						setIsSaving(false);
					}
				}}
			/>

			<div className="mt-3 rounded-none">
				<Table>
					<TableHeader>
						<TableRow className="bg-muted/40">
							<TableHead className="!bg-gray-100 !text-black border-gray-300 w-[28%]">
								Nombre
							</TableHead>
							<TableHead className="!bg-gray-100 !text-black border-gray-300 w-[40%]">
								Descripción
							</TableHead>
							<TableHead className="!bg-gray-100 !text-black border-gray-300 w-[22%]">
								Peso
							</TableHead>
							<TableHead className="!bg-gray-100 !text-black border-gray-300 w-[10%] text-right">
								Acciones
							</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{pageRows.map((r) => (
							<TableRow key={r.id} className="align-top">
								<TableCell>
									<div className="leading-tight">
										<div className="font-medium text-foreground">{r.name}</div>
										<div className="mt-0.5 text-xs text-muted-foreground">
											{r.secondary}
										</div>
									</div>
								</TableCell>

								<TableCell className="text-medium">{r.description}</TableCell>

								<TableCell>
									{r.type === "slider" ? (
										<div className="pr-3">
											<Slider
												disabled={!r.enabled}
												value={[r.weight]}
												min={-100}
												max={100}
												step={1}
												onValueChange={(v) => setWeight(r.id, v[0] ?? 0)}
											/>
											<div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
												<span>-100%</span>
												<span>100%</span>
											</div>
										</div>
									) : (
										<div className="max-w-[260px]">
											<Input
												disabled={!r.enabled}
												placeholder="Placeholder"
												value={r.value}
												onChange={(e) => setValue(r.id, e.target.value)}
											/>
										</div>
									)}
								</TableCell>

								<TableCell className="text-right">
									<div className="flex justify-end">
										<Switch
											checked={r.enabled}
											onCheckedChange={(v) => setEnabled(r.id, v)}
										/>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			<div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<Pagination
					page={page}
					totalPages={1}
					previousDisabled
					nextDisabled
					onClickPrevious={setPreviousPage}
					onClickNext={setNextPage}
					setPage={setPage}
					showTotalRows
					pageSize={pageSize}
					setPageSize={setPageSize}
				/>
			</div>
		</div>
	);
}
