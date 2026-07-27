import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://alpeville.example"),
  title: {
    default: "Alpeville",
    template: "%s | Alpeville",
  },
  description: "Netflix-inspired frontend portfolio for senior creative development work.",
  openGraph: {
    title: "Alpeville",
    description: "Netflix-inspired frontend portfolio for showcasing projects.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
