import searchIcon from "../assets/search.svg";

interface SearchBarProps {
    search: string
    setSearch: (s: string) => void
}

function SearchBar({ search, setSearch }: SearchBarProps) {
    return (
        <div className="flex flex-row bg-[#303030] rounded-lg p-2 gap-2 items-center">
            <img src={searchIcon} alt="Search" className="w-[24px] h-[24px]"/>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search applications"></input>
            {search && <button onClick={() => setSearch("")}>X</button>}
        </div>
    )
}

export default SearchBar