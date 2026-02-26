"use client";

import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStore } from "@/lib/state/store";
import type { TabSelected } from "@/lib/state/store/alarms";
import ActiveAlarmsPage from "./_components/active-alarms";
// import { useAlarmBookmarks } from "@/lib/state/store/alarms/bookmarks";

export default function AlarmsListPageClient() {
	const {
		alarmsTab: { tabSelected, setTabSelected },
		activeAlarmsAdmin: { clearState: clearActiveAlarmsState },
	} = useStore();

	// const { bookmarkedIds } = useAlarmBookmarks();

	const t = useTranslations("alerts");

	function handleTabChange(value: string) {
		setTabSelected(value as TabSelected);
	}

	useEffect(() => {
		clearActiveAlarmsState();
	}, [clearActiveAlarmsState]);

	return (
		<AnimatePresence>
			<motion.div
				className="container max-sm:!opacity-100 mx-auto flex flex-col pb-10"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { duration: 1 } }}
				exit={{ opacity: 0 }}
			>
				<div>
					{/* Tabs Component */}
					<Tabs
						value={tabSelected}
						onValueChange={handleTabChange}
						className="flex flex-col"
					>
						<TabsList className="nav-underline self-start h-auto flex-wrap">
							<TabsTrigger
								value="0"
								className={`nav-link ${tabSelected === "0" ? "active" : ""}`}
							>
								{t("tabs.actives")}
							</TabsTrigger>
							<TabsTrigger
								value="1"
								className={`nav-link ${tabSelected === "1" ? "active" : ""}`}
							>
								{t("tabs.pendingPayment")}
							</TabsTrigger>
							<TabsTrigger
								value="2"
								className={`nav-link ${tabSelected === "2" ? "active" : ""}`}
							>
								{t("tabs.mySections")}
							</TabsTrigger>
							<TabsTrigger
								value="3"
								className={`nav-link ${tabSelected === "3" ? "active" : ""}`}
							>
								{t("tabs.record")}
							</TabsTrigger>
						</TabsList>

						<TabsContent value="0" className="tab-content">
							<div className="mt-6">
								<ActiveAlarmsPage />
							</div>
						</TabsContent>
						<TabsContent value="1" className="tab-content">
							<div className="mt-6">{/* <PendingRequests /> */}</div>
						</TabsContent>
						<TabsContent value="2" className="tab-content">
							<div className="mt-6">{/* <RejectedRequests /> */}</div>
						</TabsContent>
					</Tabs>
					{/* {!isVisible && permissions.canCreateRequest && (
						<motion.div
							key="fab-create"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="fixed bottom-[12px] z-[1000000] right-[32px] max-sm:!opacity-100"
						>
							<Link href="/requests/create" onClick={onNavigateHandler}>
								<Button className="rounded-full h-12 w-12" loading={createButtonLoading}>
									{!createButtonLoading && <FontAwesomeIcon icon={faPlus} />}
								</Button>
							</Link>
						</motion.div>
					)} */}
				</div>
			</motion.div>
		</AnimatePresence>
	);
}
