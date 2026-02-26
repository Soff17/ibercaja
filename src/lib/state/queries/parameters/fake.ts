import type { ParametersListResponseSchema } from "./schema";

export const mockParametersLisResponse: ParametersListResponseSchema = {
	success: true,
	message: "",
	errors: {},
	paging: {
		totalPages: 1,
		currentPage: 1,
		pageSize: 10,
	},
	result: [
		{
			id: 3,
			name: "Ajuste estándar 2024",
			description:
				"Configuración base utilizada para el cálculo general de rubros.",
			updatedAt: "27/01/2026",
			status: 1,
		},
		{
			id: 2,
			name: "Ajuste conservador",
			description: "Reduce el peso de rubros de mayor riesgo.",
			updatedAt: "03/11/2025",
			status: 0,
		},
		{
			id: 1,
			name: "Ajuste conservador",
			description: "Reduce el peso de rubros de mayor riesgo.",
			updatedAt: "03/11/2025",
			status: 0,
		},
	],
};

const DATA = {
	mockParametersLisResponse,
} as const;

type GenerateFakeKey = keyof typeof DATA;

export function generateFake<T>(data: GenerateFakeKey): T {
	return DATA[data] as T;
}
