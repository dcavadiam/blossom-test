'use client'

import { Children, FavoriteType } from "@/types/generalTypes";
import { createContext, useState } from "react"

interface FavoriteContextType {
    favorite: FavoriteType[];
    setFavorite: React.Dispatch<React.SetStateAction<FavoriteType[]>>;
}

export const FavoriteContext = createContext<FavoriteContextType>({
    favorite: [],
    setFavorite: () => {}
});

export const FavoriteProvider = ({ children }: { children: Children }) => {
    const [favorite, setFavorite] = useState<FavoriteType[]>(()=>{
        if (typeof window !== "undefined") {
            const storedFavorites = localStorage.getItem(`favCharacters`)
            if (storedFavorites) {
                return JSON.parse(storedFavorites)
            }
        }
        return [];
    });
    return (
        <FavoriteContext.Provider value={{ favorite, setFavorite }}>
            {children}
        </FavoriteContext.Provider>
    )
}
