"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

type Props = {
	code?: string;
	message?: string;
	subtitle?: string;
	user?: {
		name: string;
		role: string;
		initials: string;
	};
};

export default function UnauthorizedPage({
	code = "",
	subtitle = "No tienes permisos para ver esta sección",
	message,
}: Props) {
	return (
		<div className="min-h-screen bg-white">
			<main className="mx-auto w-full max-w-[1400px] px-6">
				<div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
					<div className="w-full max-w-2xl flex flex-col items-center text-center">
						<div className="relative h-[220px] w-[320px] sm:h-[260px] sm:w-[380px]">
							<Image
								src="/images/error-server.png"
								alt="Error del sistema"
								fill
								priority
								className="object-contain"
							/>
						</div>

						<h1 className="mt-6 text-3xl sm:text-4xl font-semibold text-neutral-900">
							{code}
						</h1>

						<p className="mt-2 text-lg sm:text-xl text-neutral-700 max-w-xl">
							{message ?? subtitle}
						</p>

						<div className="mt-8 flex flex-col sm:flex-row gap-3">
							{/* <Button
								className="rounded-full px-8"
								onClick={() => window.location.reload()}
							>
								Reintentar
							</Button> */}
							<Button
								variant="outline"
								className="rounded-full px-8"
								onClick={() => {
									window.location.href = "/";
								}}
							>
								Volver al inicio
							</Button>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
