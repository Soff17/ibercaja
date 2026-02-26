"use client";

import type { ReactNode } from "react";
import RequireAuth from "./require-auth";

export default function RequireAuthWrapper({
	children,
}: {
	children: ReactNode;
}) {
	return <RequireAuth>{children}</RequireAuth>;
}
