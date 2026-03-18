import type { Character } from "../types/games";

type RickAndMortyApiCharacter = {
  id: number;
  name: string;
  image: string;
  species: string;
  status: string;
};

type RickAndMortyApiResponse = {
  results: RickAndMortyApiCharacter[];
};

const RICK_AND_MORTY_API_URL = "https://rickandmortyapi.com/api/character";
const GAME_CHARACTER_LIMIT = 6;

export const getCharacters = async (): Promise<Character[]> => {
  const response = await fetch(RICK_AND_MORTY_API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch characters");
  }

  const data: RickAndMortyApiResponse = await response.json();

  return data.results.slice(0, GAME_CHARACTER_LIMIT).map((character) => ({
    id: character.id,
    name: character.name,
    image: character.image,
    species: character.species,
    status: character.status,
  }));
};
