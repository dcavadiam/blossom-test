'use client';

import { useContext, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import { SearchIcon } from "../../public/icons/search"
import { FiltersIcon } from "../../public/icons/filters"

import { SearchContext } from "@/context/search";
import { CharactersContext } from "@/context/characters";

export const SearchBar = () => {

    const { search, setSearch } = useContext(SearchContext);
    const { characters, setCharacters } = useContext(CharactersContext);

    const [showModal, setShowModal] = useState<boolean>(false);
    const [sort, setSort] = useState<string>("");

    const handleClickFilters = () => {
        setShowModal(!showModal);
    }

    const handleSearch = useDebouncedCallback((value) => {
        setSearch(value)
    }, 500)

    const handleSort = (sort: string) => {
        const names = [...characters]
        if (sort === "A-Z") {
            const sortedNames = names.sort((a, b) => a.name.localeCompare(b.name))
            setCharacters(sortedNames)
            setSort("A-Z")
        } else {
            const sortedNames = names.sort((a, b) => b.name.localeCompare(a.name))
            setCharacters(sortedNames)
            setSort("Z-A")
        }
        setShowModal(false)
    }

    return (
        <div className="flex items-center justify-between w-full bg-gray-100 rounded-lg px-4 py-3 mb-5 relative">
            <span className="flex items-center gap-x-2">
                <SearchIcon />
                <input className=" bg-transparent w-full focus:outline-none placeholder-gray-400 text-[14px] font-semibold" type="text" placeholder="Search or filter results" onChange={(e) => handleSearch(e.target.value)} defaultValue={search} />
            </span>
            <span className="p-1 hover:bg-gray-200 rounded-lg relative" onClick={handleClickFilters}>
                <FiltersIcon isFilled={showModal} />
            </span>
            {
                showModal && (
                    <div className="absolute w-full top-full left-0 bg-white rounded-lg shadow-md p-4 z-20 my-2 border border-gray-100 flex flex-col gap-y-3">
                        <span className="text-sm text-gray-500">Sort list</span>
                        <span className="flex justify-around gap-2">
                            <button onClick={() => handleSort("A-Z")} className={`w-full max-w-[200px] rounded-lg bg-transparent border border-gray-300 py-2 px-4 text-sm font-semibold hover:bg-gray-100 active:bg-primary-100 active:text-primary-600 ${sort === "A-Z" ? 'bg-primary-100 text-primary-600' : ''} `}>
                                A-Z
                            </button>
                            <button onClick={() => handleSort("Z-A")} className={`w-full max-w-[200px] rounded-lg bg-transparent border border-gray-300 py-2 px-4 text-sm font-semibold hover:bg-gray-100 active:bg-primary-100 active:text-primary-600 ${sort === "Z-A" ? 'bg-primary-100 text-primary-600' : ''} `}>
                                Z-A
                            </button>

                        </span>
                        {/* <span className="text-sm text-gray-500">Character</span>
                        <span className="flex justify-around gap-2">
                            <FiltersButton>All</FiltersButton>
                            <FiltersButton>Starred</FiltersButton>
                            <FiltersButton>Others</FiltersButton>
                        </span>
                        <span className="text-sm text-gray-500">Specie</span>
                        <span className="flex justify-around gap-2">
                            <FiltersButton>All</FiltersButton>
                            <FiltersButton>Human</FiltersButton>
                            <FiltersButton>Alien</FiltersButton>
                        </span> */}
                        {/* <button className="bg-gray-100 text-gray-400 rounded-lg py-2 px-4 text-sm font-semibold mt-3">Filter</button> */}
                    </div>
                )
            }
        </div>
    )
}