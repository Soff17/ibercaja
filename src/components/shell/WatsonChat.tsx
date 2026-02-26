"use client";

import { useEffect, useRef } from "react";
import type { ScoresPayload } from "@/lib/state/queries/alerts/schema";

declare global {
	interface Window {
		watsonAssistantChatOptions: Record<string, unknown>;
	}
}

interface WatsonChatProps {
	scores?: ScoresPayload;
}

const SCORE_LABELS: Record<keyof ScoresPayload, string> = {
	anomaly_score: "Anomaly Score",
	rules_score: "Rules Score",
	profile_deviation_score: "Profile Deviation Score",
	amount_score: "Amount Score",
	velocity_score: "Velocity Score",
	device_ip_risk: "Device IP Risk",
	confidence_score: "Confidence Score",
	classification_score: "Classification Score",
};

function buildScoresMessage(scores: ScoresPayload): string {
	const lines = (Object.keys(SCORE_LABELS) as Array<keyof ScoresPayload>)
		.filter((key) => scores[key] != null)
		.map((key) => `- ${SCORE_LABELS[key]}: ${scores[key]}`);

	return `Scores de la alerta:\n${lines.join("\n")}`;
}

export function WatsonChat({ scores }: WatsonChatProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const initialized = useRef(false);

	useEffect(() => {
		if (initialized.current) return;
		initialized.current = true;

		window.watsonAssistantChatOptions = {
			integrationID: process.env.NEXT_PUBLIC_WATSON_INTEGRATION_ID,
			region: process.env.NEXT_PUBLIC_WATSON_REGION,
			serviceInstanceID: process.env.NEXT_PUBLIC_WATSON_SERVICE_INSTANCE_ID,
			orchestrateUIAgentExtensions: false,
			element: containerRef.current,
			showLauncher: false,
			openChatByDefault: true,
			hideCloseButton: true,
			namespace: "alarm-management-chat",
			onLoad: async (instance: {
				render: () => Promise<void>;
				restartConversation: () => Promise<void>;
				send: (
					message: { input: { text: string } },
					options?: { silent?: boolean },
				) => void;
			}) => {
				await instance.render();
				await instance.restartConversation();
				instance.send({ input: { text: "Principal" } }, { silent: true });

				if (scores) {
					instance.send(
						{ input: { text: buildScoresMessage(scores) } },
						{ silent: true },
					);
				}
			},
		};

		const script = document.createElement("script");
		script.src =
			"https://web-chat.global.assistant.watson.appdomain.cloud/versions/latest/WatsonAssistantChatEntry.js";
		document.head.appendChild(script);
	}, []);

	return <div ref={containerRef} className="h-full w-full" />;
}
