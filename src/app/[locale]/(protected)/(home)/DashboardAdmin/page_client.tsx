"use client";

import type { ChartData, ChartOptions } from "chart.js";

import {
	BarController,
	BarElement,
	BubbleController,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	LineController,
	LineElement,
	PointElement,
	Tooltip,
} from "chart.js";
import * as React from "react";
import { Bubble, Chart as ReactChart } from "react-chartjs-2";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import HeaderCards from "./_components/headerCards";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarController,
	LineController,
	BubbleController,
	BarElement,
	LineElement,
	PointElement,
	Tooltip,
	Legend,
);

type Period = "7d" | "30d" | "90d";

function ChartCard({
	title,
	children,
}: {
	title?: string;
	children: React.ReactNode;
}) {
	return (
		<Card className="rounded-2xl">
			{title ? (
				<CardHeader className="pb-2">
					<CardTitle className="text-base font-semibold">{title}</CardTitle>
				</CardHeader>
			) : null}
			<CardContent className={title ? "pt-2" : "p-5"}>
				<div className="h-[320px] w-full">{children}</div>
			</CardContent>
		</Card>
	);
}

export default function DashboardAdmin() {
	const [period, setPeriod] = React.useState<Period>("7d");

	// ========= CHART 1 (Bar + Line) =========
	const riskLabels = [
		"0.0 - 0.2\nMuy Bajo",
		"0.2 - 0.5\nBajo / Informativo",
		"0.5 - 0.7\nMedio (Requiere atención)",
		"0.7 - 0.9\nAlto (Prioridad)",
		"0.9 - 1.0\nCrítico (Acción inmediata)",
	];

	const alertCounts = [700, 340, 120, 60, 20];

	type MixedType = "bar" | "line";

	const barLineData: ChartData<MixedType, number[], string> = {
		labels: riskLabels,
		datasets: [
			{
				type: "bar",
				label: "Cantidad de alertas",
				data: alertCounts,
				borderRadius: 0,
				backgroundColor: "#97C0FF",
				borderSkipped: false,
			},
			{
				type: "line",
				label: "Cantidad de alertas",
				data: alertCounts,
				tension: 0.35,
				fill: false,
				borderColor: "#60A5FA",
				borderWidth: 2,
				pointRadius: 3,
				pointHoverRadius: 4,
				pointBackgroundColor: "#2563EB",
				pointBorderColor: "#ffffff",
			},
		],
	};

	const barLineOptions: ChartOptions<MixedType> = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: { position: "bottom" },
			tooltip: { enabled: true },
		},
		scales: {
			x: {
				ticks: {
					maxRotation: 0,
					autoSkip: false,
					callback(value) {
						// @ts-expect-error chart.js context
						const label = this.getLabelForValue(value) as string;
						return label.split("\n");
					},
				},
				grid: { display: false },
			},
			y: {
				beginAtZero: true,
				border: { display: false },
				grid: {},
			},
		},
	};

	const bubbleData = {
		datasets: [
			{
				label: "Alerta A",
				data: [{ x: 95, y: 9.5, r: 30 }],
				backgroundColor: "#8979FF66",
				borderColor: "#8979FF",
			},
			{
				label: "Alerta B",
				data: [{ x: 40, y: 3.8, r: 28 }],
				backgroundColor: "#FF928A66",
				borderColor: "#FF928A",
			},
			{
				label: "Impacto",
				data: [{ x: 72, y: 6.7, r: 26 }],
				backgroundColor: "#3CC3DF66",
				borderColor: "#3CC3DF",
			},
		],
	};

	const bubbleOptions: ChartOptions<"bubble"> = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: { position: "bottom" },
			tooltip: { enabled: true },
		},
		scales: {
			x: {
				min: 0,
				max: 100,
				border: { display: false },
				grid: {},
			},
			y: {
				min: 0,
				max: 10,
				border: { display: false },
				grid: {},
			},
		},
	};

	const kpis = {
		received: "1,240",
		discarded: "850",
		assigned: "42",
		confirmed: "18",
		dismissed: "12",
		sla: "4m 15s",
	};

	return (
		<div className="px-6 py-6 space-y-6">
			{/* FILTER ROW */}
			<div className="flex flex-col md:flex-row md:items-center gap-3">
				<div className="text-sm font-medium">Periodo</div>
				<div className="w-full md:w-[340px]">
					<Select value={period} onValueChange={(v) => setPeriod(v as Period)}>
						<SelectTrigger className="rounded-xl">
							<SelectValue placeholder="Selecciona periodo" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="7d">Últimos 7 días</SelectItem>
							<SelectItem value="30d">Últimos 30 días</SelectItem>
							<SelectItem value="90d">Últimos 90 días</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			{/* KPI GRID */}
			<HeaderCards kpis={kpis} />

			{/* CHARTS */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<ChartCard>
					<ReactChart<MixedType, number[], string>
						type="bar"
						data={barLineData}
						options={barLineOptions}
					/>
				</ChartCard>

				<ChartCard>
					<Bubble data={bubbleData} options={bubbleOptions} />
				</ChartCard>
			</div>
		</div>
	);
}
