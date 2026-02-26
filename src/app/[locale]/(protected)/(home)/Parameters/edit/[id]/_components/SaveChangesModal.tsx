"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

export type ChangeRow = {
	id: string;
	name: string;
	enabledPrev: boolean;
	enabledNew: boolean;
	weightPrev?: number | null;
	weightNew?: number | null;
};

interface SaveChangesModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	changes: ChangeRow[];
	onCancel: () => void;
	onConfirmSave: () => Promise<void> | void;
	isSubmitting?: boolean;
}

function formatPct(v?: number | null) {
	if (v === null || v === undefined) return "—";
	const rounded = Math.round(v);
	return `${rounded}%`;
}

function StatusPill({ active }: { active: boolean }) {
	return (
		<span
			className={[
				"inline-flex items-center justify-center rounded-full px-6 py-2 text-[14px] font-medium",
				active ? "bg-[#1F5D2A] text-white" : "bg-neutral-300 text-neutral-800",
			].join(" ")}
		>
			{active ? "Activo" : "Inactivo"}
		</span>
	);
}

export default function SaveChangesModal({
	open,
	onOpenChange,
	changes,
	onCancel,
	onConfirmSave,
	isSubmitting = false,
}: SaveChangesModalProps) {
	const handleCancel = () => {
		onOpenChange(false);
		onCancel();
	};

	const handleConfirm = async () => {
		await onConfirmSave();
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[1000px] rounded-2xl p-10">
				<DialogHeader className="space-y-3">
					<DialogTitle className="text-center text-[24px] font-semibold">
						Resumen de cambios
					</DialogTitle>
					<DialogDescription className="text-center text-[18px] text-black">
						Revisa los ajustes antes de aplicarlos
					</DialogDescription>
				</DialogHeader>

				{/* Tabla */}
				<div className="mt-8 overflow-hidden rounded-2xl border border-black">
					{/* Header */}
					<div className="grid grid-cols-12 items-center border-b border-black bg-white px-6 py-4">
						<div className="col-span-5 text-[14px] font-medium">Nombre</div>
						<div className="col-span-3 text-center text-[14px] font-medium">
							Estado
						</div>
						<div className="col-span-2 text-right text-[14px] font-medium">
							Peso anterior
						</div>
						<div className="col-span-2 text-right text-[14px] font-medium">
							Peso nuevo
						</div>
					</div>

					{/* Body */}
					<div className="bg-[#F3F4F7]">
						{changes.map((c, idx) => (
							<div
								key={c.id}
								className={[
									"grid grid-cols-12 items-center px-6 py-6",
									idx !== changes.length - 1 ? "border-b border-white/60" : "",
								].join(" ")}
							>
								<div className="col-span-5 text-[14px] font-medium text-black">
									{c.name}
								</div>

								<div className="col-span-3 flex justify-center">
									<StatusPill active={c.enabledNew} />
								</div>

								<div className="col-span-2 text-right text-[14px] text-black">
									{formatPct(c.weightPrev)}
								</div>

								<div className="col-span-2 text-right text-[14px] text-black">
									{formatPct(c.weightNew)}
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Footer botones grandes */}
				<DialogFooter className="mt-10 flex flex-col gap-6 sm:flex-row sm:justify-between">
					<Button
						type="button"
						variant="outline"
						className="h-16 flex-1 rounded-full border-primary text-primary text-[14px] hover:bg-primary/5"
						onClick={handleCancel}
						disabled={isSubmitting}
					>
						Cancelar
					</Button>

					<Button
						type="button"
						className="h-16 flex-1 rounded-full text-[14px]"
						onClick={handleConfirm}
						disabled={isSubmitting}
					>
						{isSubmitting ? "Guardando..." : "Guardar cambios"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
