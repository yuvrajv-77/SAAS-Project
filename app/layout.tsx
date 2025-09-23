import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const dmSans =  DM_Sans({
  variable: "--dm-sans",
  subsets: ["latin"],
  
});

export const metadata: Metadata = {
  title: "Listener",
  description: "Real-time AI Teaching Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} antialiased`}>
        <Navbar/>
        {children}
        </body>
    </html>
  );
}
