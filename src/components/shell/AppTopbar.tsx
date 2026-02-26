"use client";

import { faBars, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

function initialsFromName(name?: string) {
	const n = (name ?? "").trim();
	if (!n) return "??";
	const parts = n.split(/\s+/).filter(Boolean);
	const a = parts[0]?.[0] ?? "";
	const b = parts.length > 1 ? parts[1]?.[0] : (parts[0]?.[1] ?? "");
	return (a + b).toUpperCase();
}

function labelRole(rol?: string) {
	if (!rol) return "";
	if (rol === "ADMIN") return "Administrador/a";
	if (rol === "USER") return "Usuario";
	return rol;
}

export default function AppTopbar({
	onOpenMobileMenu,
	// collapsed,
	// onToggleCollapsed,
}: {
	onOpenMobileMenu: () => void;
	// collapsed: boolean;
	// onToggleCollapsed: () => void;
}) {
	const router = useRouter();

	const [open, setOpen] = useState(false);

	const { data: session, status } = useSession();

	const isLoading = status === "loading";

	const name = session?.user?.name ?? "";
	const rol = session?.user?.rol ?? undefined;

	const initials = useMemo(() => initialsFromName(name), [name]);
	const t = useTranslations("login");

	return (
		<header className="h-16 bg-white border-b px-4 md:px-6 flex items-center gap-2">
			{/* Mobile menu */}
			<button
				type="button"
				className="md:hidden h-10 w-10 rounded-md hover:bg-gray-100 inline-flex items-center justify-center"
				onClick={onOpenMobileMenu}
				aria-label="Abrir menú"
			>
				<FontAwesomeIcon icon={faBars} className="h-5 w-5" />
			</button>

			{/* Desktop collapse */}
			{/* <button
				type="button"
				className="hidden md:inline-flex h-10 w-10 rounded-md hover:bg-gray-100 items-center justify-center"
				onClick={onToggleCollapsed}
				aria-label={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
				title={collapsed ? "Expandir" : "Colapsar"}
			>
				<FontAwesomeIcon
					icon={collapsed ? faAnglesRight : faAnglesLeft}
					className="h-4 w-4"
				/>
			</button> */}

			<div className="ml-auto relative">
				{/* Trigger */}
				<button
					type="button"
					onClick={() => setOpen((v) => !v)}
					className="flex items-center gap-3 rounded-full hover:bg-gray-100 pl-2 pr-3 py-1"
					aria-label="Menú de usuario"
				>
					<div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
						{isLoading ? "…" : initials}
					</div>

					<div className="leading-tight hidden sm:block text-left">
						<div className="text-sm font-medium text-gray-900">
							{isLoading ? "Cargando..." : name || "Usuario"}
						</div>
						<div className="text-xs text-gray-500">
							{isLoading ? "" : labelRole(rol)}
						</div>
					</div>

					<FontAwesomeIcon
						icon={faChevronDown}
						className="h-4 w-4 text-gray-600 hidden sm:block"
					/>
				</button>

				{/* Dropdown */}
				{open && (
					<>
						{/* Click outside */}
						<button
							type="button"
							className="fixed inset-0 z-40 cursor-default"
							onClick={() => setOpen(false)}
							aria-label="Cerrar menú"
						/>

						<div
							className="absolute right-0 mt-2 z-50 w-[220px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
							role="menu"
						>
							<button
								type="button"
								className="w-full px-5 py-4 text-left text-[18px] text-gray-900 hover:bg-gray-50 disabled:text-gray-400"
								onClick={() => {
									setOpen(false);
									router.push("/account");
								}}
								role="menuitem"
								disabled
							>
								{t("myAccount")}
							</button>

							<div className="h-px bg-gray-200" />

							<button
								type="button"
								className="w-full px-5 py-4 text-left text-[18px] text-gray-900 hover:bg-gray-50"
								onClick={async () => {
									setOpen(false);
									await signOut({ redirect: true, callbackUrl: "/login" });
								}}
								role="menuitem"
							>
								{t("logout")}
							</button>
						</div>
					</>
				)}
			</div>
		</header>
	);
}
