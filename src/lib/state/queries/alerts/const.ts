import {
	createQueryKeys,
	type inferQueryKeys,
} from "@lukemorales/query-key-factory";
import type { AlertsFiltersSchema } from "./schema";

export const RQKEYS = createQueryKeys("administratorService", {
	getAlerts: (f: AlertsFiltersSchema) => [
		"alerts",
		f.page,
		f.page_size,
		f.search ?? "",
		typeof f.alert_status === "number" ? f.alert_status : "",
		typeof f.score_min === "number" ? f.score_min : "",
		typeof f.score_max === "number" ? f.score_max : "",
		f.priorities ?? "",
	],
	getAlertDetails: (id: string) => ["alertDetails", id],
	getAlertScores: (id: string) => ["alertScores", id],
	getAlertDetailsList: (id: string, f: AlertsFiltersSchema) => [
		"alertDetailsList",
		id,
		f.page,
		f.page_size,
	],
});

export type AdministratorKeys = inferQueryKeys<typeof RQKEYS>;
