import { z } from "zod";

export const zResponseBaseSchema = z.object({
	success: z.boolean(),
	message: z.string().nullable(),
	errors: z.object({}),
});

export const zStatusParametersSchema = z.union([z.literal(1), z.literal(0)]);

export const zParametersListSchema = z.object({
	id: z.number(),
	name: z.string(),
	description: z.string(),
	updatedAt: z.string(),
	status: zStatusParametersSchema,
});

export const zParametersListResponseSchema = zResponseBaseSchema.extend({
	paging: z.object({
		totalPages: z.number(),
		currentPage: z.number(),
		pageSize: z.number(),
	}),
	result: z.array(zParametersListSchema),
});

export type ParametersListSchema = z.infer<typeof zParametersListSchema>;
export type ParametersListResponseSchema = z.infer<
	typeof zParametersListResponseSchema
>;
export type StatusParametersSchema = z.infer<typeof zStatusParametersSchema>;
