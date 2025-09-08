import type { Metadata } from "next";
import "../styles/globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";


export const metadata: Metadata = {
  title: "Tequila",
  description: "Next.js App Router project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />         
          {children}
        <Footer />
      </body>
    </html>
  );
}
