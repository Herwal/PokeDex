import { PokemonProps } from "../api/get-pokemon-data";
import { typeColors } from "../utils/types";

interface InfoCardProps {
  pokemon: PokemonProps;
}

export default function InfoCard({ pokemon }: InfoCardProps) {
  const primaryType = pokemon.types[0];
  const bgColor = typeColors[primaryType] || "bg-gray-400";

  return (
    <div key={pokemon.id} className="flex flex-col items-center p-4">
      <div
        className={`w-full p-4 rounded-md flex justify-center items-center ${bgColor}`}
      >
        <img src={pokemon.image} alt={pokemon.name} className=" scale-125" />
      </div>

      <div className="flex flex-row border-b-2 border-gray-500 w-full justify-between py-1">
        <h3 className="capitalize font-semibold text-lg text-black">
          {pokemon.name}
        </h3>
        <p className={`rounded-md h-min ${bgColor} darker`}>{primaryType}</p>
      </div>
      <div>
        <button className="bg-blue-500 text-white rounded-md p-2 mt-2 hover:bg-blue-600">
          More Info
        </button>
      </div>
    </div>
  );
}
