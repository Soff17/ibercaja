import NextAuth, { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

type LoginData = {
	access_token: string;
	expires_in: number;
	user: { email: string; name: string; rol: string };
};

export const authOptions: NextAuthOptions = {
	session: { strategy: "jwt" },
	providers: [
		Credentials({
			name: "Credentials",
			credentials: {
				username: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.username || !credentials?.password) return null;

				const fastapi = process.env.FASTAPI_URL;
				if (!fastapi) throw new Error("FASTAPI_URL no configurado");

				const r = await fetch(`${fastapi}/auth/login`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						username: credentials.username,
						password: credentials.password,
					}),
					cache: "no-store",
				});

				const data: unknown = await r.json().catch(() => ({}));

				if (!r.ok) {
					const d = data as { message?: string; detail?: string };
					// Esto se muestra como error en signIn(..., { redirect:false })
					throw new Error(
						d?.message ?? d?.detail ?? "No se pudo iniciar sesión",
					);
				}

				const login = data as LoginData;

				return {
					id: login.user.email,
					email: login.user.email,
					name: login.user.name,
					rol: login.user.rol,
					accessToken: login.access_token,
					expiresIn: login.expires_in,
				};
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			// "user" sólo viene en el login
			if (user) {
				token.accessToken = user.accessToken;
				token.rol = user.rol ?? null;
				token.name = user.name ?? null;
				token.email = user.email ?? null;
			}
			return token;
		},
		async session({ session, token }) {
			session.accessToken = token.accessToken;

			session.user = session.user ?? { name: null, email: null };

			session.user.rol = token.rol ?? null;
			session.user.name = token.name ?? null;
			session.user.email = token.email ?? null;

			return session;
		},
	},
	pages: { signIn: "/login" },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
