const mockLoginResponse = {
	token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mocked.payload.signature",
	user: {
		email: "admin@empresa.com",
		name: "Luis Fernando Cetina",
		rol: "ADMIN",
	},
};

const DATA = {
	mockLoginResponse,
} as const;

type GenerateFakeKey = keyof typeof DATA;

export function generateFake<T>(data: GenerateFakeKey): T {
	return DATA[data] as T;
}
