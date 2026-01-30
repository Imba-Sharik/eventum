import type { Metadata } from "next";
import { Bebas_Neue, Montserrat } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import Navigation from "@/components/shared/Navigation";
import Footer from "@/components/shared/Footer";
import Preloader from "@/components/shared/Preloader";
import { getFooter } from "@/lib/strapi";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://eventum.ru"
  ),
  title: {
    default: "Eventum - Ивент агентство премиум-класса",
    template: "%s | Eventum",
  },
  description:
    "Организация мероприятий премиум-класса: корпоративы, конференции, фестивали, презентации. Полный цикл event-услуг от идеи до реализации.",
  keywords: [
    "ивент агентство",
    "организация мероприятий",
    "event agency",
    "корпоративные мероприятия",
    "конференции",
    "фестивали",
    "презентации",
    "eventum",
  ],
  authors: [{ name: "Eventum" }],
  creator: "Eventum",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Eventum",
    title: "Eventum - Ивент агентство премиум-класса",
    description:
      "Организация мероприятий премиум-класса: корпоративы, конференции, фестивали, презентации",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Eventum - Event Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eventum - Ивент агентство премиум-класса",
    description: "Организация мероприятий премиум-класса",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Footer не критичен — используем дефолтные ссылки при ошибке
  const footer = await getFooter().catch(() => undefined);

  return (
    <html lang="ru">
      <body className={`${bebasNeue.variable} ${montserrat.variable}`}>
        <Preloader />
        <Navigation />
        {children}
        <Footer data={footer} />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
