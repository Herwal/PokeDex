import { useState } from "react";

interface SearchBarProps {
    onSearch: (searchQuery: string) => void;
}
export default function SearchBar({ onSearch } : SearchBarProps) {
    const [searchQuery, setSearchQuery] = useState("");
    
    const handleSearch = () => {
        onSearch(searchQuery);
    };

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        onSearch(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key == "Enter") {
            handleSearch();
        }
    };

    return (
        <div className=" text-white">
            <input className=" bg-yellow-400"
                type="text"
                placeholder="Search in pokedex"
                value={searchQuery}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
             />
        </div>
    );
}
