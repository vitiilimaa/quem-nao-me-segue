import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Quem não me segue?",
  description:
    "Descubra quem não te segue de volta no Instagram de forma segura, rápida e fácil. Importe seus dados e visualize quem não te segue em poucos cliques, sem precisar informar credenciais ou acessar sua conta no site.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${lato.className} flex flex-col w-full items-center p-4`}
      >
        {children}
      </body>
    </html>
  );
}
