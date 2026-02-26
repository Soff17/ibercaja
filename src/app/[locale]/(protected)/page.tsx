import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import HomePage from "@/app/[locale]/(protected)/(home)/Dashboard/page";
import HomePageAdmin from "@/app/[locale]/(protected)/(home)/DashboardAdmin/page";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function HomePageDinamic() {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect("/login");
	}

	const role = session.user?.rol;

	if (role === "ADMIN") {
		return <HomePageAdmin />;
	}

	return <HomePage />;
}
