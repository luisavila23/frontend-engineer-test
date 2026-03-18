import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { GameHeader } from "../components/GameHeader";
import { MemoryCard } from "../components/MemoryCard";
import { useMemoryGame } from "../hooks/useMemoryGame";
import "../styles/game.css";

export const GamePage = () => {
  const navigate = useNavigate();
  const {
    status,
    cards,
    turns,
    matches,
    isLoading,
    errorMessage,
    startGame,
    selectCard,
    restartGame,
  } = useMemoryGame();

  const goHome = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  const handleRestart = useCallback(async () => {
    await restartGame();
  }, [restartGame]);

  if (isLoading) {
    return (
      <main className="game-page">
        <div className="game-shell">
          <p>Cargando juego...</p>
        </div>
      </main>
    );
  }

  if (errorMessage) {
    return (
      <main className="game-page">
        <div className="game-shell">
          <p>{errorMessage}</p>
          <button onClick={goHome}>Volver al inicio</button>
        </div>
      </main>
    );
  }

  return (
    <main className="game-page">
      <GameHeader />

      <section className="game-shell">
        {status === "preview" ? (
          <>
            <h2 className="game-shell__title">Personajes</h2>

            <div className="game-grid game-grid--preview">
              {cards.map((card) => (
                <MemoryCard key={card.id} card={card} mode="preview" />
              ))}
            </div>

            <div className="game-shell__actions game-shell__actions--center">
              <button className="game-button game-button--secondary" onClick={startGame}>
                Jugar
              </button>
              <button className="game-button game-button--primary" onClick={goHome}>
                Inicio
              </button>
            </div>
          </>
        ) : null}

        {status === "playing" ? (
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
                <MemoryCard
                  key={card.id}
                  card={card}
                  mode="playing"
                  onSelect={selectCard}
                />
              ))}
            </div>
          </>
        ) : null}

        {status === "finished" ? (
          <div className="game-finished">
            <h2>¡Felicitaciones!</h2>
            <p>Terminaste el juego en {turns} turnos.</p>

            <div className="game-shell__actions">
              <button className="game-button game-button--secondary" onClick={handleRestart}>
                Repetir
              </button>
              <button className="game-button game-button--primary" onClick={goHome}>
                Inicio
              </button>
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
};
