import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDeck } from "../utils/createDeck";
import "../styles/game.css";
import type { GameCard, GameStatus } from "../types/Games";
import { getCharacters } from "../services/RamService";
import RickHeaderComponent from "../components/headerComponent";

export const GamePage = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<GameStatus>("preview");
  const [cards, setCards] = useState<GameCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<GameCard[]>([]);
  const [turns, setTurns] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const totalPairs = useMemo(() => cards.length / 2, [cards.length]);

  useEffect(() => {
    const loadGame = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const characters = await getCharacters();
        const deck = createDeck(characters);

        setCards(deck);
      } catch {
        setErrorMessage("Could not load the game characters.");
      } finally {
        setIsLoading(false);
      }
    };

    loadGame();
  }, []);

  const hideAllCards = () => {
    setCards((previousCards) =>
      previousCards.map((card) => ({
        ...card,
        isFlipped: false,
      })),
    );
  };

  const startGame = () => {
    setStatus("playing");
    setTurns(0);
    setMatches(0);
    setSelectedCards([]);

    setCards((previousCards) =>
      previousCards.map((card) => ({
        ...card,
        isFlipped: true,
        isMatched: false,
      })),
    );

    window.setTimeout(() => {
      hideAllCards();
    }, 3000);
  };

  const handleCardClick = (clickedCard: GameCard) => {
    if (status !== "playing") return;
    if (clickedCard.isFlipped || clickedCard.isMatched) return;
    if (selectedCards.length === 2) return;

    const updatedCards = cards.map((card) =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card,
    );

    const updatedSelectedCards = [
      ...selectedCards,
      { ...clickedCard, isFlipped: true },
    ];

    setCards(updatedCards);
    setSelectedCards(updatedSelectedCards);
  };

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
    }, 1000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [selectedCards]);

  useEffect(() => {
    if (status === "playing" && totalPairs > 0 && matches === totalPairs) {
      setStatus("finished");
    }
  }, [matches, status, totalPairs]);

  const handleRestart = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const characters = await getCharacters();
      const deck = createDeck(characters);

      setCards(deck);
      setStatus("preview");
      setTurns(0);
      setMatches(0);
      setSelectedCards([]);
    } catch {
      setErrorMessage("Could not restart the game.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <main className="game-page">
        <div className="game-shell">
          <p>Cargando Juego...</p>
        </div>
      </main>
    );
  }

  if (errorMessage) {
    return (
      <main className="game-page">
        <div className="game-shell">
          <p>{errorMessage}</p>
          <button onClick={() => navigate("/home")}>Volver al inicio</button>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="game-page">
        <RickHeaderComponent />
        <section className="game-shell">
          {status === "preview" && (
            <>
              <h2 className="game-shell__title">Personajes</h2>

              <div className="game-grid game-grid--preview">
                {cards.map((card) => (
                  <article
                    key={card.id}
                    className="memory-card memory-card--preview"
                  >
                    <div className="memory-card__front">
                      <img
                        src={card.image}
                        alt={card.name}
                        className="memory-card__image"
                      />
                      <div className="memory-card__content">
                        <h3>{card.name}</h3>
                        <p>
                          {card.status} - {card.species}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="game-shell__actions game-shell__actions--center">
                <button
                  className="game-button game-button--secondary"
                  onClick={startGame}
                >
                  Jugar
                </button>
                <button
                  className="game-button game-button--primary"
                  onClick={() => navigate("/home")}
                >
                  Inicio
                </button>
              </div>
            </>
          )}

          {status === "playing" && (
            <>
              <div className="game-stats">
                <p>
                  <strong>Aciertos:</strong> {matches}
                </p>
                <p>
                  <strong>Turnos:</strong> {turns}
                </p>
              </div>

              <div className="game-grid">
                {cards.map((card) => (
                  <button
                    key={card.id}
                    type="button"
                    className={`memory-card ${card.isFlipped || card.isMatched ? "memory-card--flipped" : ""}`}
                    onClick={() => handleCardClick(card)}
                  >
                    {card.isFlipped || card.isMatched ? (
                      <div className="memory-card__front">
                        <img
                          src={card.image}
                          alt={card.name}
                          className="memory-card__image"
                        />
                        <div className="memory-card__content">
                          <h3>{card.name}</h3>
                          <p>
                            {card.status} - {card.species}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <img
                        src="/ram-portal.png"
                        alt="Card back"
                        className="memory-card__image"
                      />
                    )}
                  </button>
                ))}
              </div>
            </>
          )}

          {status === "finished" && (
            <div className="game-finished">
              <h2>¡Felicitaciones!</h2>
              <p>Terminaste el juego con {turns} turnos</p>

              <div className="game-shell__actions">
                <button
                  className="game-button game-button--secondary"
                  onClick={handleRestart}
                >
                  Repetir
                </button>
                <button
                  className="game-button game-button--primary"
                  onClick={() => navigate("/home")}
                >
                  Inicio
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
};
