import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { GameHeader } from "../components/GameHeader";
import { useAuth } from "../hooks/useAuth";

export const HomePage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = useCallback(() => {
    logout();
    navigate("/");
  }, [logout, navigate]);

  const handleStartGame = useCallback(() => {
    navigate("/game");
  }, [navigate]);

  return (
    <main className="page">
      <GameHeader />
      <section className="home-card">
        <h1>Bienvenido</h1>
        <p>Puedes iniciar un juego o cerrar sesion.</p>

        <div className="home-card__actions">
          <button onClick={handleStartGame}>Iniciar juego</button>
          <button onClick={handleLogout}>Cerrar sesion</button>
        </div>
      </section>
    </main>
  );
};
