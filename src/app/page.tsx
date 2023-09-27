"use client";
import {  useEffect, useState } from "react";
import InfoCard from "./components/info-card";

export type Pokemon = {
  name: string;
  url?: string;
};

export default function Home() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([])

  useEffect(()=>{
    const getAllPokemon = async () => {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
      const data = await response.json()

      setPokemon(data.results);
    };

    getAllPokemon();
  }, []);

  return (
    <main className=" bg-black text-white min-h-screen">
      <header className=" bg-red-600 py-4 px-8 border-b border-white">
        <h1 className=" text-3xl font-bold">Herwals Pokedex</h1>
      </header>
      <div className="grid grid-cols-3 gap-12 pd-8 mx-20 my-20 grid-flow-dense">
        {pokemon.map((p: Pokemon) => (
          <InfoCard key={p.name} pokemon={p} />
      ))}
      </div>
    </main>
    );
  }
