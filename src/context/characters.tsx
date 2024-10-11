'use client'

import { createContext, useState } from "react"

import { Children } from "@/types/generalTypes"
import { Character } from "@/types/queryTypes";

interface CharactersContextType {
    characters: Character[];
    setCharacters: React.Dispatch<React.SetStateAction<Character[]>>;
}

export const CharactersContext = createContext<CharactersContextType>({
    characters: [],
    setCharacters: () => { }
});

export const CharactersProvider = ({ children }: Children) => {
    const [characters, setCharacters] = useState<Character[]>([]);

    return (
        <CharactersContext.Provider value={{ characters, setCharacters }}>
            {children}
        </CharactersContext.Provider>
    )
}