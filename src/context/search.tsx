'use client'

import { createContext, useState } from "react"

import { Children } from "@/types/generalTypes"

interface SearchContextType {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchContext = createContext<SearchContextType>({
    search: "",
    setSearch: () => {}
});

export const SearchProvider = ({children}: Children) => {

    const [search, setSearch] = useState<string>("");

    return (
        <SearchContext.Provider value={{
            search,
            setSearch
        }}>
            {children}
        </SearchContext.Provider>
    )

}