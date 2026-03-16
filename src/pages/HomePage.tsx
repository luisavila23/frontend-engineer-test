import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const HomePage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <main className="page">
      <section className="home-card">
        <h1>Bienvenido</h1>
        <p>Has iniciado sesión correctamente.</p>

        <div className="home-card__actions">
          <button onClick={() => navigate("/game")}>Ir al juego</button>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </section>
    </main>
  );
};
