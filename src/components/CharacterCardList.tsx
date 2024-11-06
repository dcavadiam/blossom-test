'use client'

import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";

import { HeartIcon } from "../../public/icons/heart";

import { CharacterWithFav } from "@/types/generalTypes";
import { CharactersContext } from "@/context/characters";
import { FavoriteContext } from "@/context/favorite";
import { LayoutContext } from "@/context/layout";

export const CharacterCardList = ({ character }: { character: CharacterWithFav }) => {
    const { id, name, image, species } = character;
    const { characters, setCharacters } = useContext(CharactersContext);
    const { favorite, setFavorite } = useContext(FavoriteContext);
    const { isLayoutHidden, setIsLayoutHidden } = useContext(LayoutContext);

    const handleClickFav = () => {
        const updatedCharacters = characters.map((char) => {
            if (character.id === char.id) {
                const updatedIsFav = !char.isFav;
                console.log(updatedIsFav)
                const existingFavIndex = favorite.findIndex(fav => fav.id === char.id);

                if (existingFavIndex !== -1) {
                    const updatedFavorite = favorite.map((fav, index) =>
                        index === existingFavIndex ? { ...fav, favorite: updatedIsFav } : fav
                    );
                    setFavorite(updatedFavorite);
                } else {
                    setFavorite([
                        ...favorite,
                        {
                            id: char.id,
                            favorite: updatedIsFav
                        }
                    ]);
                }

                localStorage.setItem(`${char.id}-isFav`, JSON.stringify(updatedIsFav));
                return {
                    ...char,
                    isFav: updatedIsFav
                };
            } else {
                return char;
            }
        });
        localStorage.setItem(`favCharacters`, JSON.stringify(favorite));
        setCharacters(updatedCharacters);
    }

    const handleLayoutView = () => {
        const updateLayoutHidden = !isLayoutHidden
        setIsLayoutHidden(updateLayoutHidden)
        localStorage.setItem(`isLayoutHidden`, JSON.stringify(updateLayoutHidden))
    }

    return (
        <div className="relative">
            <Link href={`/characters/${id}`} className="border-t border-gray-200" onClick={() => {
                handleLayoutView()
            }}>
                <div className="flex flex-row justify-between items-center rounded-lg p-4 hover:bg-gray-200 relative">
                    <div className="flex items-center gap-2">
                        <Image loader={() => image} src={image} alt={`imagen de ${name}`} width={40} height={40} className="rounded-full" unoptimized={true} />
                        <div className="flex flex-col ">
                            <span className="text-sm font-semibold">{name}</span>
                            <span className="text-sm text-gray-500">{species}</span>
                        </div>
                    </div>

                </div>
            </Link>
            <span className="p-1 rounded-full bg-white absolute z-10 right-0 top-1/2 -translate-y-1/2 mr-4 duration-150 hover:scale-105" onClick={(e) => {
                e.preventDefault()
                handleClickFav()
            }}>
                <HeartIcon isFilled={favorite.find(fav => fav.id === id) && favorite.find(fav => fav.id === id)?.favorite ? true : false} />
            </span>
        </div>
    )
}