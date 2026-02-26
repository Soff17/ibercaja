"use client";

type Props = {
	label: string;
	values: string[];
	maxVisible?: number;
};

export default function ChipRow({ label, values, maxVisible = 6 }: Props) {
	const visible = values.slice(0, maxVisible);
	const remaining = values.length - maxVisible;

	return (
		<div className="flex flex-col gap-1 min-w-0">
			<p className="text-xs text-neutral-600">{label}</p>

			<div className="flex gap-2 whitespace-nowrap overflow-hidden">
				{visible.map((v) => (
					<span
						key={v}
						className="inline-flex items-center bg-white px-3 py-1 text-sm font-medium text-neutral-700"
					>
						{v}
					</span>
				))}

				{remaining > 0 && (
					<span className="text-xs text-neutral-500 self-center">
						+{remaining} más
					</span>
				)}
			</div>
		</div>
	);
}
