import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Molbak's Garden Guide",
  description: "Your personal garden coach",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
