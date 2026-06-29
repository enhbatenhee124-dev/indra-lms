import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Indra LMS",
  description: "Full-stack LMS with microservices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
