import dynamic from "next/dynamic";

const AlertDetailLayout = dynamic(() => import("./page_client"), {
	ssr: true,
});

export default async function AlertDetailPage() {
	return <AlertDetailLayout />;
}
