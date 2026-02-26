import type { ReactNode } from "react";
import RequireAuthWrapper from "@/auth/RequireAuthWrapper";
import Shell from "@/components/shell/Shell";

export default async function ProtectedLayout({
	children,
	params,
}: {
	children: ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;

	return (
		<RequireAuthWrapper>
			<Shell locale={locale}>{children}</Shell>
		</RequireAuthWrapper>
	);
}
