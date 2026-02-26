"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { makeQueryClient } from "./query-client";

export default function Providers({ children }: { children: React.ReactNode }) {
	const [client] = React.useState(() => makeQueryClient());

	return (
		<SessionProvider>
			<QueryClientProvider client={client}>
				{children}
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</SessionProvider>
	);
}
