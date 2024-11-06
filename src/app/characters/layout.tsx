'use client'

import { useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";

import { SearchBar } from "../../components/SearchBar";
import { CharacterCardList } from "@/components/CharacterCardList";

import { GET_CHARACTERS } from "@/apollo/querys/querys";

import { CharacterWithFav, Children } from "@/types/generalTypes";

import { SearchContext } from "@/context/search";
import { CharactersContext } from "@/context/characters";
import { FavoriteContext } from "@/context/favorite";
import { OrbitProgress } from "react-loading-indicators";
import { Error } from "@/components/Error";
import { LayoutContext } from "@/context/layout";

const useCharacters = () => {
    const { search } = useContext(SearchContext);
    const { characters, setCharacters } = useContext(CharactersContext);
    const { favorite } = useContext(FavoriteContext);

    const { data, loading, error } = useQuery(GET_CHARACTERS, {
        variables: {
            name: search
        }
    })

    useEffect(() => {
        if (data && data.characters.results.length > 0) {
            const newCharacters = data.characters.results.map((character: CharacterWithFav) => {
                const characterIsFav = favorite.find(fav => fav.id === character.id)?.favorite
                return {
                    ...character,
                    isFav: characterIsFav ? characterIsFav : false
                }
            })
            setCharacters(newCharacters);
        }
    }, [data, favorite, setCharacters])

    return { characters, loading, error }

}

export default function CharactersLayout({ children }: { children: Children }) {
    const { characters, loading, error } = useCharacters();
    const { isLayoutHidden } = useContext(LayoutContext);
    console.log(`state: ${isLayoutHidden}`)

    return (
        <main className="w-full h-screen flex">
            <aside className={`w-[450px] h-screen px-4 py-8 max-md:w-full max-md:py-0 ${isLayoutHidden ? "max-md:hidden" : "max-md:block"}`}>
                <h1 className="font-bold text-[24px] mt-8 mb-5">Rick and Morty List</h1>
                <SearchBar />
                {
                    loading && <div className="flex justify-center  h-screen">
                        <OrbitProgress color={"#8054C7"} size="small" text="" textColor="" />
                    </div>
                }
                {
                    error && <Error error={error.message} />
                }
                {
                    !error && !loading && characters.length > 0 && (
                        <div className="flex flex-col overflow-y-auto max-h-[70vh]">
                            <span className="text-xs uppercase text-gray-400 font-semibold my-4">Starred characters ({characters.filter(char => char.isFav).length})</span>
                            {
                                characters.filter(c => c.isFav).map(
                                    (character: CharacterWithFav) => {
                                        return <CharacterCardList key={`starred-${character.id}`} character={character} />
                                    }
                                )
                            }
                            <span className="text-xs uppercase text-gray-400 font-semibold my-4">Characters ({characters.filter(char => !char.isFav).length})</span>
                            {
                                characters.filter(c => !c.isFav).map(
                                    (character: CharacterWithFav) => {
                                        return <CharacterCardList key={`character-${character.id}`} character={character} />
                                    }
                                )
                            }
                        </div>
                    )
                }

            </aside>
            <section className={`w-full h-screen shadow-2xl shadow-slate-200 ${isLayoutHidden ? "max-md:block" : "max-md:hidden"}`}>{children}</section>
        </main>
    )
}