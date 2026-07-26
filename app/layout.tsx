import type { Metadata } from "next";
import "./globals.css";

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
      <body className="min-h-full">{children}</body>
    </html>
  );
}
