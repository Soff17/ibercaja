import {
	createQueryKeys,
	type inferQueryKeys,
} from "@lukemorales/query-key-factory";

export const RQKEYS = createQueryKeys("loginService", {
	getLogin: () => ["login"],
});

export type AdministratorKeys = inferQueryKeys<typeof RQKEYS>;
