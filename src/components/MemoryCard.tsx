import type { GameCard } from "../types/games";

type MemoryCardProps = {
  card: GameCard;
  mode: "preview" | "playing";
  onSelect?: (card: GameCard) => void;
};

export const MemoryCard = ({ card, mode, onSelect }: MemoryCardProps) => {
  if (mode === "preview") {
    return (
      <article className="memory-card memory-card--preview">
        <div className="memory-card__front">
          <img src={card.image} alt={card.name} className="memory-card__image" />
          <div className="memory-card__content">
            <h3>{card.name}</h3>
            <p>
              {card.status} - {card.species}
            </p>
          </div>
        </div>
      </article>
    );
  }

  if (card.isMatched) {
    return <div className="memory-card memory-card--removed" aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      className={`memory-card ${card.isFlipped ? "memory-card--flipped" : ""}`}
      onClick={() => onSelect?.(card)}
      disabled={card.isFlipped}
      aria-label={card.isFlipped ? `Carta revelada de ${card.name}` : "Carta oculta"}
    >
      {card.isFlipped ? (
        <div className="memory-card__front">
          <img src={card.image} alt={card.name} className="memory-card__image" />
          <div className="memory-card__content">
            <h3>{card.name}</h3>
            <p>
              {card.status} - {card.species}
            </p>
          </div>
        </div>
      ) : (
        <div className="memory-card__back">
          <img src="/ram-portal.png" alt="Reverso de carta" className="memory-card__image" />
        </div>
      )}
    </button>
  );
};
