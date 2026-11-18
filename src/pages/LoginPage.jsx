import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import "../styles/theme.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    const succesConnexion = await handleLogin(username, password);
    if (succesConnexion) {
      alert("Connexion réussie !");
    } else {
      alert("Identifiants incorrects !");
    }
  }

  return (
    <div className="container py-5">
      <div
        className="form-card card border-0 rounded-4 overflow-hidden mx-auto"
        style={{ maxWidth: "440px" }}
      >
        {/* En-tête coloré */}
        <header className="hero text-center py-4 px-3">
          <span className="blob blob-1" />
          <span className="blob blob-2" />
          <div className="fs-1 mb-1" aria-hidden="true">
            👋
          </div>
          <h2 className="h3 fw-bold mb-1">Connexion</h2>
          <p className="small mb-0">Heureux de vous revoir !</p>
        </header>

        <div className="card-body p-4 p-md-5">
          <form onSubmit={handleSubmit}>
            <div className="mb-3 text-start">
              <label htmlFor="username" className="form-label">
                Nom d&apos;utilisateur
              </label>
              <input
                id="username"
                className="form-control"
                placeholder="Username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-4 text-start">
              <label htmlFor="password" className="form-label">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                className="form-control"
                placeholder="Password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-grad rounded-pill w-100 py-2"
            >
              Se connecter →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
