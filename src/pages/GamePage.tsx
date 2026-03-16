import { useNavigate } from "react-router-dom";

export const GamePage = () => {
  const navigate = useNavigate();

  return (
    <main className="page">
      <section className="home-card">
        <h1>Memory Game</h1>
        <p>Here we will build the Rick and Morty game.</p>

        <button onClick={() => navigate("/home")}>Back to home</button>
      </section>
    </main>
  );
};
