import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { type LoginFormSchema, type LoginSchema, zLoginSchema } from "./schema";

export const useLoginMutation = (
	options: UseMutationOptions<LoginSchema, Error, LoginFormSchema> = {},
) => {
	return useMutation<LoginSchema, Error, LoginFormSchema>({
		mutationFn: async (loginForm) => {
			try {
				const res = await axios.post("/api/auth/login", {
					username: loginForm.email,
					password: loginForm.password,
				});

				return zLoginSchema.parse(res.data);
			} catch (err: unknown) {
				if (axios.isAxiosError(err)) {
					const message =
						err.response?.data?.message ??
						err.response?.data?.detail ??
						"No se pudo iniciar sesión";

					throw new Error(message);
				}

				throw new Error("Error inesperado");
			}
		},
		...options,
	});
};
