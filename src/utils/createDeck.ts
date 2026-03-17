import type { Character, GameCard } from "../types/Games";
import { shuffleArray } from "./Shuffle";


export const createDeck = (characters: Character[]): GameCard[] => {
  const duplicatedCards = characters.flatMap((character) => [
    {
      id: `${character.id}-a`,
      characterId: character.id,
      name: character.name,
      image: character.image,
      species: character.species,
      status: character.status,
      isFlipped: true,
      isMatched: false,
    },
    {
      id: `${character.id}-b`,
      characterId: character.id,
      name: character.name,
      image: character.image,
      species: character.species,
      status: character.status,
      isFlipped: true,
      isMatched: false,
    },
  ]);

  return shuffleArray(duplicatedCards);
};