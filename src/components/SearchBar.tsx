'use client';

import { SearchIcon } from "../../public/icons/search"
import { FiltersIcon } from "../../public/icons/filters"
import React, { useContext, useState } from "react";
import { SearchContext } from "@/context/search";
import { SearchContextType } from "@/types/generalTypes";
import { useDebouncedCallback } from "use-debounce";

export const SearchBar = () => {

    const [showModal, setShowModal] = useState<boolean>(false);
    const { search, setSearch } = useContext(SearchContext) as SearchContextType;

    const handleClickFilters = () => {
        setShowModal(!showModal);
    }

    const handleSearch = useDebouncedCallback((value)=> {
        setSearch(value)
    }, 500)


    return (
        <div className="flex items-center justify-between w-full bg-gray-100 rounded-lg px-4 py-3 mb-5 relative">
            <span className="flex items-center gap-x-2">
                <SearchIcon />
                <input className=" bg-transparent w-full focus:outline-none placeholder-gray-400 text-[14px] font-semibold" type="text" placeholder="Search or filter results" onChange={(e) => handleSearch(e.target.value) } defaultValue={search} />
            </span>
            <span className="p-1 hover:bg-gray-200 rounded-lg relative" onClick={handleClickFilters}>
                <FiltersIcon isFilled={showModal} />
            </span>
            {
                showModal && (
                    <div className="absolute w-full top-full left-0 bg-white rounded-lg shadow-md p-4 z-10 my-2 border border-gray-100 flex flex-col gap-y-3">
                        <span className="text-sm text-gray-500">Character</span>
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
                        </span>
                        <button className="bg-gray-100 text-gray-400 rounded-lg py-2 px-4 text-sm font-semibold mt-3">Filter</button>
                    </div>
                )
            }
        </div>
    )
}

const FiltersButton = ({ children }: { children: React.ReactNode }) => {
    return (
        <button className="w-full max-w-[200px] rounded-lg bg-transparent border border-gray-300 py-2 px-4 text-sm font-semibold hover:bg-gray-100 active:bg-primary-100 active:text-primary-600">
            {children}
        </button>
    )
}