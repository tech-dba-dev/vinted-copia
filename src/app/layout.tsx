import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "../styles/globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { MarketplaceProvider } from "@/components/MarketplaceProvider";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Marketplace",
    template: "%s | Marketplace",
  },
  description: "Marketplace C2C com foco em compras e vendas seguras.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="light">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${plusJakarta.variable} bg-background-light text-[#111813] min-h-screen antialiased`}
      >
        <AuthProvider>
          <MarketplaceProvider>
            {children}
          </MarketplaceProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
