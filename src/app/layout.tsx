import type { Metadata } from "next";
import "./globals.css";
import { ApolloClientProvider } from "./provider";
import { Children } from "@/types/generalTypes";

export const metadata: Metadata = {
  title: "Rick and Morty Characters",
  description: "A collection of Rick and Morty characters",
};

export default function RootLayout({
  children,
}: Readonly<Children>) {
  return (
    <html lang="en">
      <body>
        <ApolloClientProvider>
          {children}
        </ApolloClientProvider>
      </body>
    </html>
  );
}
