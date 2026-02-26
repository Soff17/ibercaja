import type { AlertsDetailsResponseSchema } from "./schema";

export const mockAlertDetailsResponse: AlertsDetailsResponseSchema = {
	success: true,
	message: "",
	errors: {},
	result: {
		id: "WI_0006187308",
		related: [
			"WI_0006187306",
			"WI_0006187302",
			"WI_0006187303",
			"WI_0006187304",
			"WI_0006187305",
		],

		idDevice: "617Ce366-8f16-4C09-9F0D-468617Ce366-8f16-4C09-9F0D-468",
		ipAddress: "46.222.222.43",
		brand: "Apple",
		model: "iPhone 14 Pro Max",
		ipCountry: "España",
		deviceLanguage: "es/ES",
		dateTime: "2025-10-01 16:19:21",
		amount: "12,000 €",

		transactionType: "ENROLLMENT",
		transactionStatus: "REJECTED",

		customerName: "María Eugenia Martinez",
		customerId: "SYNlwD+hqFIAU, SYNlwD+hqFIAU",

		sourceAccount: "wxbalVvwZAPex",
		beneficiaryName: "Martha Rodríguez",
		beneficiaryAccount: "wxbalVvwZAPex",
	},
};

const DATA = {
	mockAlertDetailsResponse,
} as const;

type GenerateFakeKey = keyof typeof DATA;

export function generateFake<T>(data: GenerateFakeKey): T {
	return DATA[data] as T;
}
