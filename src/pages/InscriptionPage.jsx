import { useState } from "react";
import { useNavigate } from "react-router";
import { SignIn } from "../services/authService";
import "../styles/theme.css";

function InscriptionPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSignIn = async (username, email, password) => {
    await SignIn({
      email,
      password,
      username,
    });
  };
  async function handleSubmit(e) {
    e.preventDefault();

    await handleSignIn(username, email, password);
    navigate("/login");
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
            🚀
          </div>
          <h2 className="h3 fw-bold mb-1">Inscription</h2>
          <p className="small mb-0">Créez votre compte en quelques secondes</p>
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

            <div className="mb-3 text-start">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="form-control"
                placeholder="Email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-grad rounded-pill w-100 py-2"
            >
              S&apos;inscrire →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default InscriptionPage;
