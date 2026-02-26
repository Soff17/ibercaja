import { z } from "zod";

export const zResponseBaseSchema = z.object({
	success: z.boolean(),
	message: z.string().nullable(),
	errors: z.object({}),
});

export const zPrioritySchema = z.enum(["CRITICAL", "HIGH", "MEDIUM", "LOW"]);
export const zStatusSchema = z.enum([
	"ESCALATED",
	"CLOSED",
	"IN_PROGRESS",
	"NEW",
]);

export const ztransactionStatuSchema = z.enum([
	"APPROVED",
	"REJECTED",
	"PENDING",
]);

export const zAlertsListSchema = z.object({
	id: z.number(),
	alert_id: z.string(),
	final_score: z.number(),
	priority: zPrioritySchema,
	created_at: z.string(),
	alert_status: zStatusSchema,
	assigned_user: z.string(),
	explicability: z.string(),
	bookmark: z.boolean(),
});

export const zAlertDetailsSchema = z.object({
	id: z.string(),
	related: z.array(z.string().min(1)).default([]),
	idDevice: z.string(),
	ipAddress: z.string(),
	brand: z.string(),
	model: z.string(),
	ipCountry: z.string(),
	deviceLanguage: z.string(),
	dateTime: z.string(),
	amount: z.string(),
	transactionType: z.string(),
	transactionStatus: ztransactionStatuSchema,
	customerName: z.string(),
	customerId: z.string(),
	sourceAccount: z.string(),
	beneficiaryName: z.string(),
	beneficiaryAccount: z.string(),
});

export const zAlertsResponseSchema = zResponseBaseSchema.extend({
	page: z.number(),
	total_items: z.number(),
	total_pages: z.number(),
	items: z.array(zAlertsListSchema),
});

export const zAlertsDetailsResponseSchema = zResponseBaseSchema.extend({
	result: zAlertDetailsSchema,
});

export const zAlertsFiltersSchema = z.object({
	page: z.number(),
	page_size: z.number().default(10),
	search: z.string().optional(),
	alert_status: z.string().optional(),
	score_min: z.number().optional(),
	score_max: z.number().optional(),
	priorities: z.string().optional(),
	sort: z.string().optional(),
});

export const zAlertDetailsListSchema = z.object({
	session_id: z.string(),
	device_id: z.string(),
	device_cbf: z.string(),
	device_type: z.string(),
	device_brand: z.string(),
	device_model: z.string(),
	device_language: z.string(),
	ip_address: z.string(),
	isp: z.string(),
	ip_country: z.string(),
	time_zone: z.string(),
});

export const zAlertsDetailsListResponseSchema = zResponseBaseSchema.extend({
	page: z.number(),
	total_items: z.number(),
	total_pages: z.number(),
	items: z.array(zAlertDetailsListSchema),
});

export type AlertsSchemaList = z.infer<typeof zAlertsListSchema>;
export type AlertsResponseSchema = z.infer<typeof zAlertsResponseSchema>;
export type Priority = z.infer<typeof zPrioritySchema>;
export type Status = z.infer<typeof zStatusSchema>;
export type AlertsFiltersSchema = z.infer<typeof zAlertsFiltersSchema>;
export type AlertDetailsSchema = z.infer<typeof zAlertDetailsSchema>;
export type AlertsDetailsResponseSchema = z.infer<
	typeof zAlertsDetailsResponseSchema
>;
export type AlertDetailsListSchema = z.infer<typeof zAlertDetailsListSchema>;
export type AlertsDetailsListResponseSchema = z.infer<
	typeof zAlertsDetailsListResponseSchema
>;

export const zScoresPayloadSchema = z.object({
	anomaly_score: z.number().nullable().optional(),
	rules_score: z.number().nullable().optional(),
	profile_deviation_score: z.number().nullable().optional(),
	amount_score: z.number().nullable().optional(),
	velocity_score: z.number().nullable().optional(),
	device_ip_risk: z.number().nullable().optional(),
	confidence_score: z.number().nullable().optional(),
	classification_score: z.number().nullable().optional(),
});

export const zOrchestrateAlertResponseSchema = z.object({
	id: z.string(),
	alert_id: z.string(),
	scores: zScoresPayloadSchema,
});

export type ScoresPayload = z.infer<typeof zScoresPayloadSchema>;
export type OrchestrateAlertResponse = z.infer<typeof zOrchestrateAlertResponseSchema>;
