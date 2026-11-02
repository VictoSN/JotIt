interface SearchBarProps {
    search: string
    setSearch: (s: string) => void
}

function SearchBar({ search, setSearch }: SearchBarProps) {
    return (
        <div>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search"></input>
        </div>
    )
}

export default SearchBar