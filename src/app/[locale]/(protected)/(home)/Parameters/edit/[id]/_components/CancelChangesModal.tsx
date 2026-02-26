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

type CancelChangesModalProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onStayEditing: () => void; // cerrar modal
	onExitWithoutSaving: () => void; // salir sin guardar
	isSubmitting?: boolean;
};

export default function CancelChangesModal({
	open,
	onOpenChange,
	onStayEditing,
	onExitWithoutSaving,
	isSubmitting = false,
}: CancelChangesModalProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[800px] rounded-2xl p-10">
				<DialogHeader className="space-y-6">
					<DialogTitle className="text-center text-[18px] font-semibold">
						Cancelar cambios
					</DialogTitle>

					<DialogDescription className="text-left text-[16px] leading-relaxed text-black">
						Si continúas, los cambios realizados no se guardarán.{" "}
						<span className="font-semibold">¿Deseas salir sin guardar?</span>
					</DialogDescription>
				</DialogHeader>

				<DialogFooter className="mt-10 flex flex-col gap-6 sm:flex-row sm:justify-between">
					<Button
						type="button"
						variant="secondary"
						className="h-16 flex-1 rounded-full border-primary text-primary text-[14px] hover:bg-primary/5"
						onClick={() => {
							onStayEditing();
							onOpenChange(false);
						}}
						disabled={isSubmitting}
					>
						Seguir editando
					</Button>

					<Button
						type="button"
						className="h-16 flex-1 rounded-full text-[14px]"
						onClick={() => {
							onExitWithoutSaving();
							onOpenChange(false);
						}}
						disabled={isSubmitting}
					>
						Salir sin guardar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
