import { PokemonProps } from "../api/get-pokemon-data";

export const AlphabetSort = (pokemon : PokemonProps[], sortOrder : string) => {
  return [...pokemon].sort((f, s) => {
    const first = f.name.toLowerCase();
      const second = s.name.toLowerCase();
        if (sortOrder == "asc") {
          return first.localeCompare(second);
        } else {
          return second.localeCompare(first);
        }
  });
}