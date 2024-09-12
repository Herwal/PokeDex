"use client";
import { useEffect, useState } from "react";
import SearchBar from "./components/search-bar";
import InfoCard from "./components/info-card";
import { PokemonProps, getPokemonData } from "./api/get-pokemon-data";
import { AlphabetSort } from "./utils/sort";

export default function Home() {
  const [pokemon, setPokemon] = useState<PokemonProps[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const getAllPokemon = async () => {
      const pokemonData = await getPokemonData();
      setPokemon(pokemonData);
    };

    getAllPokemon();
  }, []);

  const filteredList = pokemon.filter((pokemons) =>
    pokemons.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedPokemon = AlphabetSort(filteredList, sortOrder);

  const handleAlphabetSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleTypeSort = () => {};

  return (
    <main className=" bg-gray-50 text-white flex flex-col">
      <header className=" bg-gray-50 p-2 flex flex-col justify-center items-center">
        <h1 className=" text-3xl font-bold text-black p-2">Pokedex</h1>
        <div className="flex flex-row px-4 m-4">
          <div className="px-2">
            <SearchBar
              onSearch={(searchQuery) => setSearchQuery(searchQuery)}
            />
          </div>
          <div className="flex flex-row justify-between">
            <button
              className="p-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={handleAlphabetSort}
              title={"Sort alphabetically"}
            >
              {"↓↑"}
            </button>
            <button
              className="p-1 text-white rounded-md hover:border-gray-400 border "
              onClick={handleTypeSort}
              title={"Sort by type"}
            >
              <img
                src="/assets/fire-type.png"
                alt="Fire Type"
                className="w-7 h-7"
              />
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-5 mx-8 gap-x-8 gap-y-16 p-8 border-2 border-purple-600 rounded-lg">
        {sortedPokemon.map((pokemon: PokemonProps) => (
          <InfoCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </main>
  );
}
