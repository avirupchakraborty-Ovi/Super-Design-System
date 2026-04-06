import type { Metadata } from "next";
import { Hind_Madurai } from "next/font/google";
import "./globals.css";

const hindMadurai = Hind_Madurai({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind-madurai",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Super Design System",
  description: "Photon Design System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${hindMadurai.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
