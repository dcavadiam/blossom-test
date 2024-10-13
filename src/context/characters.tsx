'use client'

import { createContext, useState } from "react"

import { Children } from "@/types/generalTypes"
import { CharacterWithFav } from "@/types/generalTypes"

interface CharactersContextType {
    characters: CharacterWithFav[];
    setCharacters: React.Dispatch<React.SetStateAction<CharacterWithFav[]>>;
}

export const CharactersContext = createContext<CharactersContextType>({
    characters: [],
    setCharacters: () => { },
});

export const CharactersProvider = ({ children }: { children: Children }) => {
    const [characters, setCharacters] = useState<CharacterWithFav[]>([]);
    return (
        <CharactersContext.Provider value={{ characters, setCharacters }}>
            {children}
        </CharactersContext.Provider>
    )
}