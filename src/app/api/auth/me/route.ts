import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
	const cookieStore = await cookies();
	const token = cookieStore.get("access_token")?.value;

	if (!token) {
		return NextResponse.json({ detail: "No auth" }, { status: 401 });
	}

	const fastapi = process.env.FASTAPI_URL;
	if (!fastapi) {
		return NextResponse.json(
			{ detail: "FASTAPI_URL no configurado" },
			{ status: 500 },
		);
	}
	const r = await fetch(`${fastapi}/auth/me`, {
		headers: { Authorization: `Bearer ${token}` },
		cache: "no-store",
	});

	const data = await r.json().catch(() => ({
		detail: "Respuesta inválida del servidor",
	}));

	if (!r.ok) {
		return NextResponse.json(
			{ detail: data?.detail ?? data?.message ?? "No auth" },
			{ status: r.status },
		);
	}

	const user = data?.user ?? data;

	return NextResponse.json({ user }, { status: 200 });
}
