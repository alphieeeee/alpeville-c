import type { Metadata } from "next";
import "./globals.css";
import TransitionLayout from "./components/gsap/TransitionLayout";
import Header from "./components/Header";
import Animated3DBG from "./components/Animated3DBG";
import RouteAnimated3DChar from "./components/RouteAnimated3DChar";
// import ScrollProgressBar from "./components/ScrollProgressBar";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const siteDescription =
  "Alpeville is a web developer portfolio featuring interactive web experiences, motion-led interfaces, and selected projects.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Alpeville Carinan",
  description: siteDescription,
  applicationName: "Alpeville",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/ac-logo.png",
    shortcut: "/ac-logo.png",
    apple: "/ac-logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Alpeville",
    title: "Alpeville Carinan",
    description: siteDescription,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Alpeville web developer portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alpeville Carinan",
    description: siteDescription,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-background text-foreground flex flex-col">
        <Animated3DBG />
        {/* <ScrollProgressBar /> */}
        <Header />
        <RouteAnimated3DChar />
        <TransitionLayout>
          {children}
        </TransitionLayout>
      </body>
    </html>
  );
}
