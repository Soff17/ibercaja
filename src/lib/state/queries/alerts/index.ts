import { type UseQueryOptions, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo } from "react";
import { api } from "@/lib/axios";
import { RQKEYS } from "./const";
import { generateFake } from "./fake";
import type {
	AlertsDetailsListResponseSchema,
	AlertsDetailsResponseSchema,
	AlertsFiltersSchema,
	AlertsResponseSchema,
	OrchestrateAlertResponse,
} from "./schema";

const USE_FAKE = process.env.NEXT_PUBLIC_USE_FAKE_API === "true";

export const useGetAreas = (
	filters: AlertsFiltersSchema,
	// accessToken?: string | null,
	queryOptions: Omit<UseQueryOptions<AlertsResponseSchema>, "queryKey"> = {},
) => {
	const normalizedFilters = useMemo(
		() => ({
			page: Number(filters.page) || 1,
			page_size: Number(filters.page_size) || 10,
			search: filters.search ? String(filters.search) : undefined,
			priorities: filters.priorities ? String(filters.priorities) : undefined,
			score_min:
				typeof filters.score_min === "number" ? filters.score_min : undefined,
			score_max:
				typeof filters.score_max === "number" ? filters.score_max : undefined,
			alert_status:
				typeof filters.alert_status === "number"
					? filters.alert_status
					: undefined,
			sort: filters.sort,
		}),
		[
			filters.page,
			filters.page_size,
			filters.search,
			filters.priorities,
			filters.score_min,
			filters.score_max,
			filters.alert_status,
			filters.sort,
		],
	);

	const { data, ...rest } = useQuery({
		queryKey: ["alerts", normalizedFilters],
		queryFn: async () => {
			const response = await api.get("/v1/alerts", {
				params: {
					page: normalizedFilters.page,
					page_size: normalizedFilters.page_size,
					search: normalizedFilters.search,
					alert_status: normalizedFilters.alert_status,
					score_min: normalizedFilters.score_min,
					score_max: normalizedFilters.score_max,
					priorities: normalizedFilters.priorities,
					sort: normalizedFilters.sort,
				},
				// // headers: {
				// // 	...(!!accessToken && { Authorization: `Bearer ${accessToken}` }),
				// // },
			});
			return response.data;
		},
		...queryOptions,
	});

	return { data, ...rest };
};

export const useGetAlertDetails = (
	id: string,
	queryOptions: Omit<
		UseQueryOptions<AlertsDetailsResponseSchema>,
		"queryKey"
	> = {},
) => {
	const { data, ...rest } = useQuery({
		queryKey: RQKEYS.getAlertDetails(id).queryKey,
		enabled: !!id,
		queryFn: async () => {
			if (USE_FAKE) {
				await new Promise((r) => setTimeout(r, 600));
				return generateFake<AlertsDetailsResponseSchema>(
					"mockAlertDetailsResponse",
				);
			}
			const response = await axios.get(`/v1/Alerts/${id}`);
			return response.data;
		},
		...queryOptions,
	});

	return { data, ...rest };
};

export const useGetAlertScores = (
	id: string,
	queryOptions: Omit<
		UseQueryOptions<OrchestrateAlertResponse>,
		"queryKey"
	> = {},
) => {
	const { data, ...rest } = useQuery({
		queryKey: RQKEYS.getAlertScores(id).queryKey,
		enabled: !!id,
		queryFn: async () => {
			const response = await api.get(`/v1/orchestrate_alerts/${id}`);
			return response.data as OrchestrateAlertResponse;
		},
		...queryOptions,
	});

	return { data, ...rest };
};

export const useGetAlertDetailsList = (
	id: string,
	filters: AlertsFiltersSchema,
	queryOptions: Omit<
		UseQueryOptions<AlertsDetailsListResponseSchema>,
		"queryKey"
	> = {},
) => {
	const normalizedFilters = useMemo(
		() => ({
			page: Number(filters.page) || 1,
			page_size: Number(filters.page_size) || 10,
		}),
		[filters.page, filters.page_size],
	);
	const { data, ...rest } = useQuery({
		queryKey: RQKEYS.getAlertDetailsList(id, normalizedFilters).queryKey,
		enabled: !!id,
		queryFn: async () => {
			// if (USE_FAKE) {
			// 	await new Promise((r) => setTimeout(r, 600));
			// 	return generateFake<AlertsDetailsListResponseSchema>(
			// 		"mockAlertsDetailsListResponse",
			// 	);
			// }
			const response = await api.get(`/v1/alerts/${id}/history`);
			return response.data;
		},
		...queryOptions,
	});

	return { data, ...rest };
};
