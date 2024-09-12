"use client";
import { useEffect, useState } from "react";
import InfoCard from "./components/info-card";
import SearchBar from "./components/search-bar";

export type Pokemon = {
  name: string;
  url?: string;
  image: string;
  types: string[];
  weight: number;
};

export default function Home() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const getAllPokemon = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        const data = await response.json();

        const urls = data.results.map((p: { url: string }) => p.url);

        const pokemonData = await Promise.all(
          urls.map(async (url: string) => {
            const response = await fetch(url);
            const pokedata = await response.json();

            return {
              id: pokedata.id,
              name: pokedata.name,
              image: pokedata.sprites.front_default,
              types: pokedata.types.map(
                (t: { type: { name: string } }) => t.type.name
              ),
              weight: pokedata.weight,
            };
          })
        );

        setPokemon(pokemonData);
      } catch (error) {
        console.log("Error fetching pokemon", error);
      }
    };

    getAllPokemon();
  }, []);

  const filteredList = pokemon.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedPokemon = [...filteredList].sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (sortOrder == "asc") {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }
  });

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <main className=" bg-orange-500 text-white min-h-screen">
      <header className=" bg-orange-500 py-4 px-8 border-b border-white flex justify-between items-center">
        <h1 className=" text-3xl font-bold text-black">Herwals Pokedex</h1>
        <div className="">
          <SearchBar onSearch={(searchQuery) => setSearchQuery(searchQuery)} />
          <button
            onClick={handleSort}
            className="px-1 py-1 m-1 bg-yellow-400 text-white rounded-md hover:bg-yellow-600 ml-auto"
          >
            Sort A-Z or Z-A
          </button>
        </div>
      </header>

      <div className="grid grid-cols-3 mx-64 gap-12 py-8 px-8 bg-yellow-600 border-x border-white">
        {sortedPokemon.map((p: Pokemon) => (
          <InfoCard key={p.name} pokemon={p} />
        ))}
      </div>
    </main>
  );
}
