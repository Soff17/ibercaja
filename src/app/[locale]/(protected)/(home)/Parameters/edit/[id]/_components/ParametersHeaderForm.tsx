import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Props = {
	name: string;
	description: string;
	onChangeName: (v: string) => void;
	onChangeDescription: (v: string) => void;
	onSave: () => void;
	onCancel: () => void;
	isSaving?: boolean;
};

export function ParametersHeaderForm({
	name,
	description,
	onChangeName,
	onChangeDescription,
	onSave,
	onCancel,
	isSaving,
}: Props) {
	return (
		<div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
			{/* Left: inputs */}
			<div className="flex-1 space-y-4">
				<div className="space-y-2">
					<Label className="text-sm text-muted-foreground">Nombre</Label>
					<Input
						value={name}
						onChange={(e) => onChangeName(e.target.value)}
						placeholder="Soporte técnico falso"
						className="h-11 rounded-md border"
					/>
				</div>

				<div className="space-y-2">
					<Label className="text-sm text-muted-foreground">Descripción</Label>
					{/* Si lo quieres 1 línea como en la imagen, usa Input en vez de Textarea */}
					<Textarea
						value={description}
						onChange={(e) => onChangeDescription(e.target.value)}
						placeholder="Configuración base utilizada para el cálculo general de rubros."
						className="min-h-[64px] resize-none rounded-md border"
					/>
				</div>
			</div>

			{/* Right: buttons */}
			<div className="flex w-full flex-col gap-3 lg:w-[220px]">
				<Button
					onClick={onSave}
					disabled={isSaving}
					className="h-11 rounded-full"
				>
					{isSaving ? "Guardando..." : "Guardar cambios"}
				</Button>

				<Button
					onClick={onCancel}
					variant="outline"
					disabled={isSaving}
					className="h-11 rounded-full border-primary text-primary hover:bg-primary/5"
				>
					Cancelar
				</Button>
			</div>
		</div>
	);
}
