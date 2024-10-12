'use client'

import { useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";

import { SearchBar } from "../../components/SearchBar";
import { CharacterCardList } from "@/components/Card";

import { GET_CHARACTERS } from "@/apollo/querys/querys";

import { Children } from "@/types/generalTypes";
import { Character } from "@/types/queryTypes";

import { SearchContext } from "@/context/search";
import { CharactersContext } from "@/context/characters";

const useCharacters = () => {
    const { search } = useContext(SearchContext);
    const { characters, setCharacters } = useContext(CharactersContext);

    const { data, loading, error } = useQuery(GET_CHARACTERS, {
        variables: {
            name: search
        }
    })

    useEffect(() => {
        if (data && data.characters.results.length > 0) {
            setCharacters(data.characters.results)
        }
    }, [data])

    return { characters, loading, error }

}

export default function CharactersLayout({ children }: { children: Children }) {
    const { characters, loading, error } = useCharacters();
    return (
        <main className="w-full h-screen flex">
            <aside className="w-[450px] h-screen px-4">
                <h1 className="font-bold text-[24px] mt-8 mb-5">Rick and Morty List</h1>
                <SearchBar />
                {
                    loading && <p>Loading...</p>
                }
                {
                    error && <p>Error: {error.message}</p>
                }
                {
                    !error && !loading && characters.length > 0 && (
                        <div className="flex flex-col overflow-y-auto max-h-[70vh]">
                            <span className="text-xs uppercase text-gray-400 font-semibold my-4">Starred characters</span>
                            {/* STARRED CHARACTERS */}
                            <span className="text-xs uppercase text-gray-400 font-semibold my-4">Characters ({characters.length})</span>
                            {
                                characters.map(
                                    (character: Character) => {
                                        return (
                                            <CharacterCardList key={character.id} character={character} />
                                        )
                                    }
                                )
                            }
                        </div>
                    )
                }

            </aside>
            <section className="w-full h-screen shadow-2xl shadow-slate-200">{children}</section>
        </main>
    )
}