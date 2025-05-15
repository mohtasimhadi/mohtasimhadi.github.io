import type { Metadata } from "next";
import Header from "@/comonents/global/Header";
import NavPages from "@/comonents/global/Navpages";
import Footer from "@/comonents/global/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "the Moho Blog",
  description: "Journal of Mohtasim Hadi Rafi",
  icons: {
    icon: "/imgs/people/self.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <Header />
        <NavPages />
        <main className="m-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}