import { z } from "zod";

export const zUserSchema = z.object({
	email: z.string().email(),
	name: z.string(),
	rol: z.enum(["ADMIN", "USER", "AUDITOR"]),
});

export const zLoginSchema = z.object({
	user: zUserSchema,
});

export const zLoginFormSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export type LoginSchema = z.infer<typeof zLoginSchema>;
export type LoginFormSchema = z.infer<typeof zLoginFormSchema>;
export type UserSchema = z.infer<typeof zUserSchema>;
