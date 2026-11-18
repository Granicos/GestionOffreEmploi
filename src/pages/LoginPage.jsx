import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { handleLogin } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    const succesConnexion = await handleLogin(email, password);
    if (succesConnexion) {
      alert("Connexion réussie !");
      navigate("/");
    } else {
      alert("Identifiants incorrects !");
    }
  }
  return (
    <div className="container mt-5">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Connexion
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
