"use client";

import { useState } from "react";
import AppSidebar from "@/components/shell/AppSidebar";
import AppTopbar from "@/components/shell/AppTopbar";
import { Button } from "../ui/button";

export default function Shell({
	children,
	locale,
}: {
	children: React.ReactNode;
	locale: string;
}) {
	const [collapsed, _setCollapsed] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);

	return (
		<div className="min-h-screen bg-[#F4F5F7]">
			<div className="flex min-h-screen">
				{/* Desktop sidebar */}
				<div className="hidden md:block">
					<AppSidebar locale={locale} collapsed={collapsed} />
				</div>

				{/* Mobile drawer */}
				{mobileOpen && (
					<div className="md:hidden fixed inset-0 z-50">
						<Button
							className="absolute inset-0 bg-black/40"
							onClick={() => setMobileOpen(false)}
						/>
						<div className="absolute left-0 top-0 h-full">
							<AppSidebar
								locale={locale}
								collapsed={false}
								onNavigate={() => setMobileOpen(false)}
							/>
						</div>
					</div>
				)}

				{/* Right */}
				<div className="flex-1 flex flex-col min-w-0">
					<AppTopbar
						onOpenMobileMenu={() => setMobileOpen(true)}
						// collapsed={collapsed}
						// onToggleCollapsed={() => setCollapsed((v) => !v)}
					/>

					<main className="flex-1 p-4 md:p-6 bg-white">
						<div className="min-h-[calc(100vh-64px-32px)]">{children}</div>
					</main>
				</div>
			</div>
		</div>
	);
}
