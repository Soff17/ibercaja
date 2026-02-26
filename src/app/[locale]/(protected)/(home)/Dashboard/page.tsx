import dynamic from "next/dynamic";

const Alarms = dynamic(() => import("./page_client"), {
	ssr: true,
});

export default async function AlarmsPage() {
	return <Alarms />;
}
