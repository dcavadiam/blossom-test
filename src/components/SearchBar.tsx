import { SearchIcon } from "../../public/icons/search"
import { FiltersIcon } from "../../public/icons/filters"

export const SearchBar = () => {
    return (
        <div className="flex items-center justify-between w-full bg-gray-100 rounded-lg px-4 py-3 mb-5">
            <span className="flex items-center gap-x-2">
                <SearchIcon />
                <input className=" bg-transparent w-full focus:outline-none placeholder-gray-400 text-[14px] font-semibold" type="text" placeholder="Search or filter results" />
            </span>
            <span className="p-1 hover:bg-gray-200 rounded-lg ">
                <FiltersIcon isFilled={false} />
            </span>
        </div>
    )
}