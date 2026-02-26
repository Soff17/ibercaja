import {
	createQueryKeys,
	type inferQueryKeys,
} from "@lukemorales/query-key-factory";

export const RQKEYS = createQueryKeys("administratorService", {
	getParametersList: () => ["parametersList"],
});

export type AdministratorKeys = inferQueryKeys<typeof RQKEYS>;
