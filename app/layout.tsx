import type { Metadata } from "next";
import "./globals.css";
import TransitionLayout from "./components/gsap/TransitionLayout";

export const metadata: Metadata = {
  title: "Alpeville",
  description: "A clean Next.js starter template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <TransitionLayout>{children}</TransitionLayout>
      </body>
    </html>
  );
}
