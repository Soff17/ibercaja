import { type DefaultSession } from "next-auth";

declare module "next-auth" {
	interface Session {
		accessToken?: string;
		user: DefaultSession["user"] & {
			rol?: string | null;
		};
	}

	interface User {
		rol?: string | null;
		accessToken?: string;
		expiresIn?: number;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		accessToken?: string;
		rol?: string | null;
		name?: string | null;
		email?: string | null;
	}
}
