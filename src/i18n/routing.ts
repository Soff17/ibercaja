// src/i18n/routing.ts
export const routing = {
	locales: ["es", "en"],
	defaultLocale: "es",
} as const;

export type AppLocale = (typeof routing.locales)[number];
