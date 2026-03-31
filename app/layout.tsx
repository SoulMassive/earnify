import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Earnify",
  description: "Earn while you study",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
