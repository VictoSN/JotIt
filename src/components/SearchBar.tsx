import searchIcon from "../assets/search.svg";
import closeIcon from "../assets/close.svg";

interface SearchBarProps {
    search: string
    setSearch: (s: string) => void
}

function SearchBar({ search, setSearch }: SearchBarProps) {
    return (
        <div className="flex flex-row bg-[#303030] rounded-lg p-2 gap-2 items-center focus-within:border-[#6e6e6e]">
            <img src={searchIcon} alt="Search" className="icon-size opacity-60"/>
            <input
                className="outline-none"
                value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search applications"
            />
            {search && 
                <button onClick={() => setSearch("")}>
                    <img src={closeIcon} alt="Clear" className="icon-size opacity-60" />
                </button>
            }
        </div>
    )
}

export default SearchBar