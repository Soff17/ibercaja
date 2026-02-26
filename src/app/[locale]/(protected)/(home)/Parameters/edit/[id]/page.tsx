import dynamic from "next/dynamic";

const EditParametersLayout = dynamic(() => import("./page_client"), {
	ssr: true,
});

export default async function EditParametersPage() {
	return <EditParametersLayout />;
}
