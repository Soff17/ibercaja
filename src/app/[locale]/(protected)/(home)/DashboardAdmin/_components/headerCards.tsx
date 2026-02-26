import { StatCard } from "./StatCard";

export type DashboardKpis = {
	received: string | number;
	discarded: string | number;
	assigned: string | number;
	confirmed: string | number;
	dismissed: string | number;
	sla: string | number;
};

type Props = {
	kpis: DashboardKpis;
};

export default function HeaderCards({ kpis }: Props) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
			<StatCard title="Alertas recibidas" value={kpis.received} />
			<StatCard title="Alertas descartadas" value={kpis.discarded} />
			<StatCard
				title="Asignadas"
				value={kpis.assigned}
				subtitle="(pendientes)"
			/>
			<StatCard
				title="Confirmadas"
				value={kpis.confirmed}
				subtitle="(fraude)"
			/>
			<StatCard
				title="Desechadas"
				value={kpis.dismissed}
				subtitle="(falsos positivos)"
			/>
			<StatCard title="SLA promedio" value={kpis.sla} />
		</div>
	);
}
