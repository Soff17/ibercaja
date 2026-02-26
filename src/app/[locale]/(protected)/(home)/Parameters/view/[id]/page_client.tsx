"use client";

import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import * as React from "react";
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
		enabled: false,
	},
	{
		id: "anomaly_score",
		name: "Anomaly_score",
		secondary: "Comportamiento inusual",
		description:
			"Evalúa qué tan diferente es una operación respecto a patrones habituales.",
		type: "slider",
		weight: 0,
		enabled: false,
	},
	{
		id: "rules_score",
		name: "Rules_score",
		secondary: "Reglas de seguridad",
		description:
			"Evalúa qué tan diferente es una operación respecto a patrones habituales.",
		type: "slider",
		weight: 10,
		enabled: false,
	},
	{
		id: "profile_deviation_score",
		name: "Profile_deviation_score",
		secondary: "Desviación del perfil",
		description:
			"Evalúa qué tan diferente es una operación respecto a patrones habituales.",
		type: "slider",
		weight: -5,
		enabled: false,
	},
	{
		id: "amount_score",
		name: "Amount_score",
		secondary: "Importe de la operación",
		description:
			"Evalúa qué tan diferente es una operación respecto a patrones habituales.",
		type: "slider",
		weight: 12,
		enabled: false,
	},

	{
		id: "velocity_score",
		name: "Velocity_score",
		secondary: "Frecuencia de actividad",
		description:
			"Evalúa qué tan diferente es una operación respecto a patrones habituales.",
		type: "slider",
		weight: 8,
		enabled: false,
	},
	{
		id: "device_ip_risk_score",
		name: "Device_ip_risk_score",
		secondary: "Riesgo de dispositivo y ubicación",
		description:
			"Evalúa qué tan diferente es una operación respecto a patrones habituales.",
		type: "slider",
		weight: 3,
		enabled: false,
	},
	{
		id: "confidence",
		name: "Confidence",
		secondary: "Nivel de confianza del modelo",
		description:
			"Evalúa qué tan diferente es una operación respecto a patrones habituales.",
		type: "slider",
		weight: 0,
		enabled: false,
	},
];

function clamp(n: number, min: number, max: number) {
	return Math.min(max, Math.max(min, n));
}

export default function ParametersInner() {
	const params = useParams<{ id: string }>();
	const id = params?.id;
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
	const [rows, setRows] = React.useState<ParamRow[]>(initialRows);

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
			{/* Back + header line */}
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

			{/* Title + action */}
			<div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
				<div>
					<h1 className="text-3xl font-semibold tracking-tight">
						Soporte técnico falso
					</h1>
					<p className="mt-1 text-sm text-muted-foreground">
						Configuración base utilizada para el cálculo general de rubros.
					</p>
				</div>

				<Button
					variant="outline"
					className="h-10 rounded-full border-primary text-primary hover:bg-primary/5"
					onClick={() => router.push(`/Parameters/edit/${id}`)}
				>
					Editar configuración
				</Button>
			</div>

			{/* Table */}
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

								<TableCell className="text-sm text-muted-foreground">
									{r.description}
								</TableCell>

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

			{/* Bottom controls */}
			<div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<Pagination
					page={page}
					totalPages={1}
					previousDisabled={true}
					nextDisabled={true}
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
