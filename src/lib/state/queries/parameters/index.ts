import { type UseQueryOptions, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { RQKEYS } from "./const";
import { generateFake } from "./fake";
import type { ParametersListResponseSchema } from "./schema";

const USE_FAKE = process.env.NEXT_PUBLIC_USE_FAKE_API === "true";

export const useGetParametersList = (
	// accessToken?: string | null,
	queryOptions: Omit<
		UseQueryOptions<ParametersListResponseSchema>,
		"queryKey"
	> = {},
) => {
	const { data, ...rest } = useQuery({
		queryKey: RQKEYS.getParametersList().queryKey,
		queryFn: async () => {
			if (USE_FAKE) {
				await new Promise((r) => setTimeout(r, 600));
				return generateFake<ParametersListResponseSchema>(
					"mockParametersLisResponse",
				);
			}
			const response = await axios.get("/v1/ParametersList");
			return response.data;
		},
		...queryOptions,
	});

	return { data, ...rest };
};
