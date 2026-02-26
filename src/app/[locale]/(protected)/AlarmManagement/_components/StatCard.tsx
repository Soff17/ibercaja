import { Card, CardContent } from "@/components/ui/card";

export type StatCardProps = {
	title: string;
	value: string | number;
	subtitle?: string;
	className?: string;
};

export function StatCard({ title, value, subtitle, className }: StatCardProps) {
	return (
		<Card
			className={[
				"rounded-2xl border-2 border-gray-300 bg-muted/40 shadow-none bg-gray-50",
				className,
			]
				.filter(Boolean)
				.join(" ")}
		>
			<CardContent className="pr-4 flex-col items-end justify-center min-h-[120px] text-right ">
				<div className="text-2xl font-normal text-foreground leading-none">
					{title}
				</div>

				{subtitle ? (
					<div className="text-sm text-muted-foreground">{subtitle}</div>
				) : null}

				<div className="mt-6 text-5xl font-semibold tracking-tight leading-none">
					{value}
				</div>
			</CardContent>
		</Card>
	);
}
