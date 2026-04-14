import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono, Geist_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "MASONDA — Creative Developer",
  description:
    "MASONDA is a creative development studio run by Joseph. Building change-making digital products for bold founders.",
  openGraph: {
    title: "MASONDA — Creative Developer",
    description: "Building change-making digital products for bold founders.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${spaceMono.variable} ${geistMono.variable} min-h-screen antialiased`}
    >
      <body className="min-h-screen bg-[#080807] text-white">
        {children}
      </body>
    </html>
  );
}
