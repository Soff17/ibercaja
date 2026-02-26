import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const AlarmManagement = dynamic(() => import("./page_client"), {
	ssr: true,
});

export default async function AlarmManagementPage() {
	const session = await getServerSession(authOptions);

	const role = session?.user?.rol;

	if (role !== "ADMIN") {
		redirect("/unauthorized");
	}

	return <AlarmManagement />;
}
