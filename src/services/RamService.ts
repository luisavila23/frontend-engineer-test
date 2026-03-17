import type { Character } from "../types/Games";


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

export const getCharacters = async (): Promise<Character[]> => {
  const response = await fetch('https://rickandmortyapi.com/api/character');

  if (!response.ok) {
    throw new Error('Failed to fetch characters');
  }

  const data: RickAndMortyApiResponse = await response.json();

  return data.results.slice(0, 6).map((character) => ({
    id: character.id,
    name: character.name,
    image: character.image,
    species: character.species,
    status: character.status,
  }));
};