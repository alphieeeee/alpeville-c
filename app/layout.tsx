import type { Metadata } from "next";
import "./globals.css";
import TransitionLayout from "./components/gsap/TransitionLayout";
import Header from "./components/site/Header";
import Animated3DBG from "./components/site/Animated3DBG";

export const metadata: Metadata = {
  title: {
    default: "Alpeville",
    template: "%s | Alpeville",
  },
  description: "Portfolio skeleton for a Strapi-powered 3D site.",
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
        <Header />
        <TransitionLayout>
          {children}
        </TransitionLayout>
      </body>
    </html>
  );
}
