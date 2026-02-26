import { z } from "zod";

export const zLoginRequestSchemaForm = () =>
	z.object({
		email: z
			.string()
			.min(1, "El correo es obligatorio")
			.email("Correo electrónico inválido"),

		password: z
			.string()
			.min(1, "La contraseña es obligatoria")
			.min(6, "La contraseña debe tener al menos 6 caracteres"),
	});

export type LoginRequestSchemaForm = z.infer<
	ReturnType<typeof zLoginRequestSchemaForm>
>;
