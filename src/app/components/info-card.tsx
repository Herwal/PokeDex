import { Pokemon } from "../page"

interface InfoCardProps {
  pokemon: Pokemon;
  className?: string;
}

export default function InfoCard({ pokemon }: InfoCardProps) {
  return (
    <div key={pokemon.name} className="border border-white p-2 rounded-md flex justify-between items-center bg-orange-500">
        <div className="flex flex-col">
        <h3 className="capitalize font-semibold text-lg text-black">{pokemon.name}</h3>
        <button className="text-yellow-400 hover:underline block">See more</button>
        </div>
      <img
        src={pokemon.image}
        alt={pokemon.name}
        className=" scale-125"
      />
    </div>
  );
}
