import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import RickHeaderComponent from "../components/headerComponent";

export const HomePage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <main className="page">
      <RickHeaderComponent />
      <section className="home-card">
        <h1>Bienvenido</h1>
        <p>Puedes iniciar un juego o cerrar sesión.</p>

        <div className="home-card__actions">
          <button onClick={() => navigate("/game")}>Iniciar juego</button>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </section>
    </main>
  );
};
