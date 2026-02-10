import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const roadRadio = localFont({
  src: [
    {
      path: "../public/fonts/RoadRadio-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/RoadRadio.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/RoadRadio-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/RoadRadio-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-road-radio",
});

const gilroy = localFont({
  src: "../public/fonts/gilroy-medium.ttf",
  variable: "--font-gilroy",
});

export const metadata: Metadata = {
  title: "Champion School - Школа фитнес-тренеров",
  description: "Обучение профессии фитнес-тренера с 2019 года. Получите сертификат, практические навыки и поддержку в трудоустройстве.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className={`${roadRadio.variable} ${gilroy.variable} font-gilroy antialiased`}>{children}</body>
    </html>
  );
}
