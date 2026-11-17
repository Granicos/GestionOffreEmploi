import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    if (login(username, password)) {
      alert("Connexion résussie !");
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
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
