export type PokemonProps = {
  id: number;
  name: string;
  url?: string;
  image?: string;
  weight?: number;
  types: string[];
};

export const getPokemonData = async (): Promise<PokemonProps[]> => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    const data = await response.json();

    const urls = data.results.map((pokemon: { url: string }) => pokemon.url);

    const pokemonData = await Promise.all(
      urls.map(async (url: string) => {
        const response = await fetch(url);
        const pokedata = await response.json();

        return {
          id: pokedata.id,
          name: pokedata.name,
          image: pokedata.sprites.front_default,
          weight: pokedata.weight,
          types: pokedata.types.map(
            (typeList: { type: { name: string } }) => typeList.type.name
          ),
        };
      })
    );

    return pokemonData;
  } catch (error) {
    console.log("Error fetching pokemon", error);
    return [];
  }
};
