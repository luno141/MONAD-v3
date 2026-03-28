import type { Metadata } from "next";
import { Press_Start_2P, Share_Tech_Mono } from "next/font/google";
import "./globals.css";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
});

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-share-tech",
});

export const metadata: Metadata = {
<<<<<<< HEAD
  title: "KHAN-FLICT",
=======
  title: "KHAN FLICT",
>>>>>>> 939bf3d (mkc3)
  description:
    "A meme-fueled dungeon RPG where relic hunters, dramatic one-liners, and a cursed Bollywood dungeon collide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pressStart2P.variable} ${shareTechMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
