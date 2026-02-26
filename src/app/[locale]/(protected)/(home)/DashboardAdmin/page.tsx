import dynamic from "next/dynamic";

const DashboardAdmin = dynamic(
	() => import("@/app/[locale]/(protected)/(home)/DashboardAdmin/page_client"),
	{
		ssr: true,
	},
);

export default async function HomePageAdmin() {
	return <DashboardAdmin />;
}
