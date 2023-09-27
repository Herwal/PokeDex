import { Pokemon } from "../page"

interface infoCardProps {
    pokemon: Pokemon
}

export default function InfoCard({ pokemon }: infoCardProps) {
    return (
        <div key={pokemon.name} className="border border-white p-2 rounded-md">
        <h3 className="capitalize font-semibold text-lg">{pokemon.name}</h3>
        <button className="text-blue-500 hover:underline">See more</button>
      </div>
    )
}
