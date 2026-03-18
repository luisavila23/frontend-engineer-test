import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { GameCard, GameStatus } from "../types/games";
import { getCharacters } from "../services/rickAndMortyService";
import { createDeck } from "../utils/createDeck";

const PREVIEW_DURATION_MS = 3000;
const MATCH_CHECK_DELAY_MS = 1000;

const hideAllCards = (cards: GameCard[]) =>
  cards.map((card) => ({
    ...card,
    isFlipped: false,
  }));

const revealAllCards = (cards: GameCard[]) =>
  cards.map((card) => ({
    ...card,
    isFlipped: true,
    isMatched: false,
  }));

type UseMemoryGameResult = {
  status: GameStatus;
  cards: GameCard[];
  turns: number;
  matches: number;
  isLoading: boolean;
  errorMessage: string;
  totalPairs: number;
  startGame: () => void;
  selectCard: (card: GameCard) => void;
  restartGame: () => Promise<void>;
};

export const useMemoryGame = (): UseMemoryGameResult => {
  const [status, setStatus] = useState<GameStatus>("preview");
  const [cards, setCards] = useState<GameCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<GameCard[]>([]);
  const [turns, setTurns] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const previewTimeoutRef = useRef<number | null>(null);

  const totalPairs = useMemo(() => cards.length / 2, [cards.length]);

  const resetRoundState = useCallback(() => {
    setStatus("preview");
    setTurns(0);
    setMatches(0);
    setSelectedCards([]);
  }, []);

  const loadDeck = useCallback(async () => {
    if (previewTimeoutRef.current) {
      window.clearTimeout(previewTimeoutRef.current);
      previewTimeoutRef.current = null;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const characters = await getCharacters();
      setCards(createDeck(characters));
      resetRoundState();
    } catch {
      setErrorMessage("No se pudieron cargar los personajes del juego.");
    } finally {
      setIsLoading(false);
    }
  }, [resetRoundState]);

  useEffect(() => {
    void loadDeck();
  }, [loadDeck]);

  const startGame = useCallback(() => {
    if (previewTimeoutRef.current) {
      window.clearTimeout(previewTimeoutRef.current);
    }

    setStatus("playing");
    setTurns(0);
    setMatches(0);
    setSelectedCards([]);
    setCards((previousCards) => revealAllCards(previousCards));

    previewTimeoutRef.current = window.setTimeout(() => {
      setCards((previousCards) => hideAllCards(previousCards));
      previewTimeoutRef.current = null;
    }, PREVIEW_DURATION_MS);
  }, []);

  const selectCard = useCallback(
    (clickedCard: GameCard) => {
      if (status !== "playing") return;
      if (clickedCard.isFlipped || clickedCard.isMatched) return;
      if (selectedCards.length === 2) return;

      setCards((previousCards) =>
        previousCards.map((card) =>
          card.id === clickedCard.id ? { ...card, isFlipped: true } : card,
        ),
      );

      setSelectedCards((previousSelectedCards) => [
        ...previousSelectedCards,
        { ...clickedCard, isFlipped: true },
      ]);
    },
    [selectedCards.length, status],
  );

  useEffect(() => {
    if (selectedCards.length !== 2) return;

    const [firstCard, secondCard] = selectedCards;

    const timeoutId = window.setTimeout(() => {
      const isMatch = firstCard.characterId === secondCard.characterId;

      if (isMatch) {
        setCards((previousCards) =>
          previousCards.map((card) =>
            card.characterId === firstCard.characterId
              ? { ...card, isMatched: true }
              : card,
          ),
        );

        setMatches((previousMatches) => previousMatches + 1);
      } else {
        setCards((previousCards) =>
          previousCards.map((card) =>
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, isFlipped: false }
              : card,
          ),
        );
      }

      setTurns((previousTurns) => previousTurns + 1);
      setSelectedCards([]);
    }, MATCH_CHECK_DELAY_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [selectedCards]);

  useEffect(() => {
    if (status === "playing" && totalPairs > 0 && matches === totalPairs) {
      setStatus("finished");
    }
  }, [matches, status, totalPairs]);

  useEffect(
    () => () => {
      if (previewTimeoutRef.current) {
        window.clearTimeout(previewTimeoutRef.current);
      }
    },
    [],
  );

  return {
    status,
    cards,
    turns,
    matches,
    isLoading,
    errorMessage,
    totalPairs,
    startGame,
    selectCard,
    restartGame: loadDeck,
  };
};
