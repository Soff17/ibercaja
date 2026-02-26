"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export type FraudAction = "confirm" | "false_positive" | "release";

export type FraudModalResult = {
	action: FraudAction;
	message: string;
	status?: string;
};

interface FraudActionModalProps {
	open: boolean;
	action: FraudAction | null;
	onOpenChange: (open: boolean) => void;
	onConfirm: (result: FraudModalResult) => Promise<void> | void;
	isSubmitting?: boolean;
	statusOptions?: { value: string; label: string }[];
}

const actionConfig = {
	confirm: {
		title: "Confirmar fraude",
		description:
			"Detalla los indicadores identificados durante la revisión y cualquier información relevante para el seguimiento de la alerta.",
	},
	false_positive: {
		title: "No fraude: falso positivo",
		description:
			"Comparte información relevante que permita entender por qué la alerta no requiere acción.",
	},
	release: {
		title: "Liberar alerta",
		description:
			"Antes de liberar la alerta, selecciona el motivo para continuar con el flujo correcto",
	},
};

export default function FraudActionModal({
	open,
	action,
	onOpenChange,
	onConfirm,
	isSubmitting = false,
	statusOptions = [
		{ value: "released", label: "No fue posible contactar al cliente" },
		{ value: "needs_review", label: "Alerta escalada a oficinas" },
		{ value: "escalated", label: "Reasignación requerida" },
	],
}: FraudActionModalProps) {
	const [message, setMessage] = React.useState("");
	const [status, setStatus] = React.useState<string | undefined>();

	const isRelease = action === "release";

	React.useEffect(() => {
		if (!open) return;
		setMessage("");
		setStatus(undefined);
	}, [open]);

	const canSubmit =
		!!action && message.trim().length > 0 && (!isRelease || !!status);

	const handleSubmit = async () => {
		if (!action || !canSubmit) return;

		await onConfirm({
			action,
			message: message.trim(),
			...(isRelease ? { status } : {}),
		});

		onOpenChange(false);
	};

	if (!action) return null;

	const config = actionConfig[action];

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[900px]">
				<DialogHeader>
					<DialogTitle className="text-center pb-[40px] text-[20px] font-semibold flex items-center justify-center gap-2">
						{config.title}
					</DialogTitle>
					<DialogDescription className="text-lg gap-2 text-black">
						{config.description}
					</DialogDescription>
				</DialogHeader>

				<div className="grid gap-4 py-2">
					{isRelease && (
						<div className="grid gap-2">
							<Select value={status} onValueChange={setStatus}>
								<SelectTrigger className="w-[380px]">
									<SelectValue placeholder="Seleccionar" />
								</SelectTrigger>
								<SelectContent>
									{statusOptions.map((opt) => (
										<SelectItem key={opt.value} value={opt.value}>
											{opt.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					)}

					<div className="grid gap-2">
						<Label className="text-lg font-semibold">
							Detalles adicionales
						</Label>
						<Textarea
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							placeholder=""
							className="min-h-[110px]"
						/>
					</div>
				</div>

				<DialogFooter className="gap-4 mt-4">
					<Button
						className="flex-1"
						type="button"
						variant="secondary"
						onClick={() => onOpenChange(false)}
						disabled={isSubmitting}
					>
						Cancelar
					</Button>

					<Button
						className="flex-1"
						type="button"
						variant={"primary"}
						onClick={handleSubmit}
						disabled={!canSubmit || isSubmitting}
					>
						Confirmar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
