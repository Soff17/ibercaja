import "./globals.css";
import "./styles/variables.css";
import "./styles/tabs.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Providers from "@/lib/providers";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Montserrat } from "next/font/google";

config.autoAddCss = false;

const montserrat = Montserrat({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	variable: "--font-montserrat",
	display: "swap",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="es">
			<body className={montserrat.variable}>
				<Providers>
					{children}
					<ToastContainer
						position="top-center"
						hideProgressBar
						autoClose={5000}
						closeOnClick
						pauseOnHover
						theme="dark"
					/>
				</Providers>
			</body>
		</html>
	);
}
