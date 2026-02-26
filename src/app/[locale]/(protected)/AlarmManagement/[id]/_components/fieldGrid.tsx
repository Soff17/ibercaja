"use client";

import type * as React from "react";

export type KV = {
	label: string;
	value: React.ReactNode;
	icon?: React.ReactNode;
};

type Props = {
	title?: string;
	items: KV[];
};

export default function FieldGrid({ title, items }: Props) {
	return (
		<div className="bg-white">
			{title ? (
				<div className="px-2 py-1 border-b">
					<p className="text-sm font-semibold text-neutral-800">{title}</p>
				</div>
			) : null}

			<div className="grid gap-3 p-1 sm:grid-cols-2 lg:grid-cols-4">
				{items.map((it) => (
					<div key={it.label} className="min-w-0">
						<p className="text-[11px] uppercase tracking-wide text-neutral-500">
							{it.label}
						</p>
						<div className="mt-1 flex items-start gap-2 min-w-0">
							{it.icon ? (
								<span className="mt-0.5 text-neutral-400 shrink-0">
									{it.icon}
								</span>
							) : null}

							<p className="text-sm font-medium text-neutral-900 truncate flex-1 min-w-0">
								{it.value}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
