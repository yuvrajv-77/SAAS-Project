import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { dark, shadcn } from "@clerk/themes";

const dmSans = DM_Sans({
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
    <ClerkProvider appearance={{ 
      baseTheme: shadcn, 
      variables:{
        borderRadius: "1rem",
        fontFamily:"var(--dm-sans)",
        
      }
      }}>
      <html lang="en">
        <body className={`${dmSans.className} antialiased `}>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
} 
