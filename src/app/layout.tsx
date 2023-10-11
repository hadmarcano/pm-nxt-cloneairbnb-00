import { Open_Sans } from "next/font/google";
import ClientProcessor from "@molecules/clientProcessor/ClientProcessor";
import Navbar from "@molecules/navbar/Navbar";
import RegisterModal from "@molecules/modals/RegisterModal";
import LoginModal from "@molecules/modals/LoginModal";
import ToasterProvider from "@providers/ToasterProvider";
import getCurrentUser from "./serverActions/getCurrentUser";
import "@atoms/globals.css";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata = {
	title: "Alquiler de alojamientos vacacionales y apartamentos",
	description:
		"Encuentra todo tipo de alojamientos personalizados desde pequeños apartamentos y casas a grandes hoteles",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {

	const currentUser = await getCurrentUser();

	return (
		<html lang="en">
			<body className={font.className}>
				<ClientProcessor>
					<ToasterProvider />
					<LoginModal />
					<RegisterModal />
					<Navbar currentUser={currentUser} />
					{children}
				</ClientProcessor>
			</body>
		</html>
	);
}
