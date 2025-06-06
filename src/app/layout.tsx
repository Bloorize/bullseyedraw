import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BullseyeDraw - Strategic Hunt Planning",
  description: "Calculate hunting draw odds and strategically plan your hunting applications to maximize your chances of drawing premium tags across multiple states.",
  keywords: "hunting, draw odds, calculator, elk, deer, moose, utah, colorado, wyoming, montana, BullseyeDraw",
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
