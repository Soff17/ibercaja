import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export type User = {
	email: string;
	name: string;
	rol: "ADMIN" | "USER" | "AUDITOR";
};

export const authKeys = {
	me: ["auth", "me"] as const,
};

export function useLogout() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async () => {
			await axios.post("/api/auth/logout");
		},
		onSuccess: () => {
			qc.removeQueries({ queryKey: authKeys.me });
		},
	});
}
