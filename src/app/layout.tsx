
import Header from "@/components/global/Header";
import NavPages from "@/components/global/NavPages";
import Footer from "@/components/global/Footer";
import "./globals.css";



export default function RootLayout({ children }: { children: React.ReactNode }) {
      return (
            <html lang="en">
                  <title>the Moho Blog</title>
                  <meta name="description" content="Journal of Mohtasim Hadi Rafi" />
                  <meta name="viewport" content="width=device-width, initial-scale=1" />
                  <link rel="icon" href="/imgs/people/self.png" />
                  <body className="bg-white text-gray-900">
                        <Header />
                        <NavPages />
                        <main>{children}</main>
                        <Footer />
                  </body>
            </html>
      );
}
