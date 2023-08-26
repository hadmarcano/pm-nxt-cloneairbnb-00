import { Open_Sans } from "next/font/google";
import ClientProcessor from "@molecules/clientProcessor/ClientProcessor";
import Navbar from "@molecules/navbar/Navbar";
import RegisterModal from "@molecules/modals/RegisterModal";
import ToasterProvider from "@providers/ToasterProvider";
import "@atoms/globals.css";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata = {
	title: "Alquiler de alojamientos vacacionales y apartamentos",
	description:
		"Encuentra todo tipo de alojamientos personalizados desde pequeños apartamentos y casas a grandes hoteles",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={font.className}>
				<ClientProcessor>
					<ToasterProvider />
					<Navbar />
					<RegisterModal />
					{children}
				</ClientProcessor>
			</body>
		</html>
	);
}
