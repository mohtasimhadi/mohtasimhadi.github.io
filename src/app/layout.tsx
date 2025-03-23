import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mohtasim Hadi Rafi",
  description: "moho.blog",
  icons: {
    icon: "/imgs/people/dp.jpg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <Navbar />
        <div className="mt-[72px]">{children}</div>
      </body>
    </html>
  );
}