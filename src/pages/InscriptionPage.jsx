import { useState } from "react";
import { useNavigate } from "react-router";
import { SignIn } from "../services/authService";

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
    <div className="container mt-5">
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <button
          type="submit"
          className="btn btn-outline-grad rounded-pill px-3"
        >
          S'inscrire
        </button>
      </form>
    </div>
  );
}

export default InscriptionPage;
