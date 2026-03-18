import type { Character, GameCard } from "../types/games";
import { shuffleArray } from "./shuffle";

const createCard = (character: Character, variant: "a" | "b"): GameCard => ({
  id: `${character.id}-${variant}`,
  characterId: character.id,
  name: character.name,
  image: character.image,
  species: character.species,
  status: character.status,
  isFlipped: true,
  isMatched: false,
});

export const createDeck = (characters: Character[]): GameCard[] => {
  const duplicatedCards = characters.flatMap((character) => [
    createCard(character, "a"),
    createCard(character, "b"),
  ]);

  return shuffleArray(duplicatedCards);
};
