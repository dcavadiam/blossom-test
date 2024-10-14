import type { Metadata } from "next";
import "./globals.css";
import { ApolloClientProvider } from "../apollo/provider";
import { Children } from "@/types/generalTypes";
import { SearchProvider } from "@/context/search";
import { CharactersProvider } from "@/context/characters";
import { FavoriteProvider } from "@/context/favorite";

export const metadata: Metadata = {
  title: "Rick and Morty Characters",
  description: "A collection of Rick and Morty characters",
};

export default function RootLayout({
  children,
}: Readonly<{ children: Children }>) {
  return (
    <html lang="en">
      <body>
        <ApolloClientProvider>
          <SearchProvider>
            <CharactersProvider>
              <FavoriteProvider>
                {children}
              </FavoriteProvider>
            </CharactersProvider>
          </SearchProvider>
        </ApolloClientProvider>
      </body>
    </html>
  );
}
