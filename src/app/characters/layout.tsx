'use client'

import { useQuery } from "@apollo/client";

import { SearchBar } from "../../components/SearchBar";
import { CharacterCardList } from "@/components/Card";

import { GET_CHARACTERS } from "@/apollo/querys/querys";

import { Children } from "@/types/generalTypes";
import { Character } from "@/types/queryTypes";

const useCharacters = () => {
    const { data, loading, error } = useQuery(GET_CHARACTERS)
    return { data, loading, error }
}

export default function CharactersLayout({ children }: Children) {
    const { data, loading, error } = useCharacters();
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
                    !error && !loading && data && (
                        <div className="flex flex-col overflow-y-auto max-h-[70vh]">
                            <span className="text-xs uppercase text-gray-400 font-semibold my-4">Starred characters</span>
                            {/* STARRED CHARACTERS */}
                            <span className="text-xs uppercase text-gray-400 font-semibold my-4">Characters ({data.characters.results.length})</span>
                            {
                                data.characters.results.map(
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