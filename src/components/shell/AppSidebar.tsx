"use client";

import {
	faChartLine,
	faClipboardList,
	faClock,
	faLandMineOn,
	faScaleUnbalanced,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type Props = {
	locale: string;
	collapsed: boolean;
	onNavigate?: () => void;
};
type Role = "ADMIN" | "USER";

export default function AppSidebar({ locale, collapsed, onNavigate }: Props) {
	const pathname = usePathname();
	const { data: session, status } = useSession();
	const role = (session?.user?.rol ?? null) as Role | null;
	const items = [
		{
			label: "Dashboard",
			href: `/${locale}`,
			icon: faChartLine,
			roles: ["ADMIN"],
		},
		{
			label: "Gestión de alertas",
			href: `/${locale}/AlarmManagement`,
			icon: faLandMineOn,
			roles: ["ADMIN"],
		},
		{
			label: "Gestión de alertas",
			href: `/${locale}`,
			icon: faLandMineOn,
			roles: ["USER"],
		},

		{
			label: "Ajuste de parámetros",
			href: `/${locale}/Parameters`,
			icon: faScaleUnbalanced,
			roles: ["ADMIN"],
		},
		{
			label: "Administración de roles",
			href: `/${locale}/roles`,
			icon: faClipboardList,
			roles: ["ADMIN"],
		},
		{
			label: "Historial",
			href: `/${locale}/history`,
			icon: faClock,
			roles: ["ADMIN"],
			disabled: true,
		},
	];

	const visibleItems =
		status !== "authenticated"
			? []
			: items.filter((item) => (role ? item.roles.includes(role) : false));

	return (
		<aside
			className={cn(
				"bg-background border-r h-screen sticky top-0",
				"transition-[width] duration-200 ease-in-out bg-gray-50",
				collapsed ? "w-[84px]" : "w-[280px] ",
			)}
		>
			{/* Header */}
			<div className="relative h-16 flex items-center justify-center px-4">
				{!collapsed ? (
					<Image
						src="/images/logo-ibercaja.png"
						alt="Ibercaja"
						width={160}
						height={28}
						priority
						className="h-7 w-auto"
					/>
				) : (
					<div className="h-9 w-9 rounded-md bg-muted" aria-hidden />
				)}
			</div>

			<Separator className="mx-auto my-2 w-2/3 h-[2px] bg-gray-200" />

			{/* Nav */}
			<nav className="bg-gray-50">
				<ul className="space-y-1">
					{visibleItems.map((it) => {
						const active = pathname === it.href;

						const linkClass = cn(
							"relative w-full block ",
							"flex items-center gap-3 px-3 py-4  transition-colors",
							active
								? "bg-white text-primary font-medium"
								: "text-primary-1000 hover:bg-muted hover:text-foreground",
							it.disabled && "opacity-50 pointer-events-none",
						);

						return (
							<li key={it.href}>
								<Link
									href={it.href}
									onClick={onNavigate}
									className={cn(linkClass, collapsed && "justify-center px-3")}
									title={collapsed ? it.label : undefined}
								>
									<span
										className={cn(
											"absolute left-0 inset-y-0 w-1 rounded-r",
											active ? "bg-primary" : "bg-transparent",
										)}
										aria-hidden
									/>

									<FontAwesomeIcon
										icon={it.icon}
										className={cn(
											"h-5 w-5",
											active ? "text-primary" : "text-primary-1000",
										)}
									/>

									{!collapsed && <span className="truncate">{it.label}</span>}
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>
		</aside>
	);
}
