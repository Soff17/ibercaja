"use client";

import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import type { ReactNode } from "react";
import { useEffect } from "react";

export default function RequireAuth({ children }: { children: ReactNode }) {
	const { data: _session, status } = useSession();
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		if (status === "unauthenticated") {
			router.replace(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
		}
	}, [status, router, pathname]);

	if (status === "loading") return <div className="p-6">Cargando...</div>;
	if (status === "unauthenticated") return null;

	return <>{children}</>;
}
