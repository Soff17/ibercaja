import type { Config } from "tailwindcss";

const config = {
	darkMode: "class",
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				/* =========================
           SHADCN BASE TOKENS
        ========================== */
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				border: "hsl(var(--border))",
				ring: "hsl(var(--ring))",
				input: "hsl(var(--input))",

				/* =========================
           PRIMARY (ESCALA COMPLETA)
        ========================== */
				/* =========================
           SECONDARY
        ========================== */
				secondary: {
					100: "var(--titan-white)",
					200: "var(--tropical-blue)",
					300: "var(--day-sky-blue)",
					600: "var(--secondary-600)",
					800: "var(--secondary-800)",
					DEFAULT: "var(--secondary)",
					foreground: "hsl(var(--secondary-foreground))",
				},

				/* =========================
           TERTIARY / SUCCESS / ETC
        ========================== */
				testiary: {
					500: "var(--blue-violet)",
					900: "var(--cherry-pie)",
					DEFAULT: "var(--pale-lavender)",
				},

				success: {
					100: "var(--frosted-mint)",
					700: "var(--success-700)",
					DEFAULT: "var(--paris-green)",
				},

				danger: {
					50: "var(--danger-50)",
					500: "var(--watermelon)",
					800: "var(--danger-800)",
					900: "var(--danger-900)",
					DEFAULT: "var(--brick-red)",
					foreground: "var(--white-color)",
				},

				warning: {
					500: "var(--mikado-yellow)",
					800: "var(--warning-800)",
					DEFAULT: "var(--cream-brulee)",
				},

				warningSecond: {
					800: "var(--warning-second-800)",
					DEFAULT: "var(--warning-second-100)",
				},

				disabled: {
					DEFAULT: "var(--oslo-gray)",
				},

				gray: {
					100: "var(--gray-100)",
					200: "var(--gray-200)",
					500: "var(--gray-500)",
					900: "var(--gray-900)",
					DEFAULT: "var(--white-smoke)",
				},

				/* =========================
           IBERCAJA
        ========================== */
				ibercaja: {
					acua: "var(--picton-blue)",
					danger: "var(--watermelon)",
					pink: "var(--royal-fuchsia)",
					white: "var(--white-color)",
					dodgerBlue: "var(--dodger-blue)",
					osloGray: "var(--oslo-gray)",
					black: "var(--black-color)",
					purple: {
						100: "var(--purple-100)",
						200: "var(--purple-200)",
						DEFAULT: "var(--purple-900)",
					},
				},

				/* =========================
           SHADCN CARD / POPOVER
        ========================== */
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},

				chart: {
					1: "hsl(var(--chart-1))",
					2: "hsl(var(--chart-2))",
					3: "hsl(var(--chart-3))",
					4: "hsl(var(--chart-4))",
					5: "hsl(var(--chart-5))",
				},
			},

			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},

			backgroundImage: {
				"purple-blue":
					"linear-gradient(to right, var(--purple-500), var(--secondary-500))",
			},

			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},

			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},

			gridTemplateColumns: {
				13: "repeat(13, minmax(0, 1fr))",
				14: "repeat(14, minmax(0, 1fr))",
				15: "repeat(15, minmax(0, 1fr))",
				16: "repeat(16, minmax(0, 1fr))",
			},
		},
	},
} satisfies Config;

export default config;
