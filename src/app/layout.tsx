import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AOSInit from "@/components/AOSInit";
import RFQModal from "@/components/ui/RFQModal";
import SignInModal from "@/components/ui/SignInModal";
import ScrollToTop from "@/components/ui/ScrollToTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BizMart - India's Largest Online Single-Seller B2B Marketplace",
  description:
    "IndiaMART-style single-seller B2B marketplace. Search thousands of products, get best prices, request quotations and connect with direct manufacturer sales.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-[#f4f5f8] text-slate-800`}>
        <AOSInit />
        <Header />
        <main className="flex-grow flex flex-col">{children}</main>
        <Footer />
        <RFQModal />
        <SignInModal />
        <ScrollToTop />
      </body>
    </html>
  );
}
