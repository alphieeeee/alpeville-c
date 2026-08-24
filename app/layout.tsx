import type { Metadata } from "next";
import "./globals.css";
import TransitionLayout from "./components/gsap/TransitionLayout";
import Header from "./components/Header";
import Animated3DBG from "./components/Animated3DBG";
import Animated3DChar from "./components/Animated3DChar";
import ScrollProgressBar from "./components/ScrollProgressBar";

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
        <ScrollProgressBar />
        <Animated3DChar />
        <Header />
        <TransitionLayout>
          {children}
        </TransitionLayout>
      </body>
    </html>
  );
}
