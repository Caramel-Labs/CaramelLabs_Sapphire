import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar";
import { Italianno } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sapphire",
  description: "The Digital Nomad's Guide to Sri Lanka.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Navbar />
      </body>
    </html>
  );
}
