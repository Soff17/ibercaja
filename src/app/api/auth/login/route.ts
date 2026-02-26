import { NextResponse } from "next/server";

type LoginBody = { email?: string; username?: string; password?: string };

type LoginData = {
	access_token: string;
	expires_in: number;
	user: { email: string; name: string; rol: string };
};

type ErrorWithStatus = Error & { status?: number };

function getErrorInfo(err: unknown): { status: number; message: string } {
	if (err instanceof Error) {
		const e = err as ErrorWithStatus;
		return {
			status: Number(e.status ?? 500),
			message: e.message || "Error inesperado",
		};
	}
	return { status: 500, message: "Error inesperado" };
}

async function realLogin(body: LoginBody): Promise<LoginData> {
	const fastapi = process.env.FASTAPI_URL;
	if (!fastapi) {
		throw Object.assign(new Error("FASTAPI_URL no configurado"), {
			status: 500,
		});
	}

	const payload = {
		username: body.email ?? body.username,
		password: body.password,
	};

	const r = await fetch(`${fastapi}/auth/login`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
		cache: "no-store",
	});

	const data: unknown = await r.json().catch(() => ({}));

	if (!r.ok) {
		const d = data as { message?: string; detail?: string };
		const message = d?.message ?? d?.detail ?? "No se pudo iniciar sesión";
		throw Object.assign(new Error(message), { status: r.status });
	}

	return data as LoginData;
}

export async function POST(req: Request) {
	const body = (await req.json().catch(() => ({}))) as LoginBody;

	try {
		const data = await realLogin(body);

		const res = NextResponse.json({ user: data.user }, { status: 200 });

		res.cookies.set("access_token", data.access_token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			maxAge: Number(data.expires_in ?? 60 * 60),
		});
		res.cookies.set("user", JSON.stringify(data.user), {
			httpOnly: false,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			maxAge: Number(data.expires_in ?? 60 * 60),
		});

		return res;
	} catch (err: unknown) {
		const { status, message } = getErrorInfo(err);
		return NextResponse.json({ message }, { status });
	}
}
