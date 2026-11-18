import { Link } from "react-router";
import "../styles/theme.css";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="app-navbar navbar sticky-top shadow-sm py-3">
      <div className="container-xxl d-flex flex-wrap justify-content-between align-items-center gap-2">
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center gap-2 m-0"
        >
          <img src="../favicon.svg" alt="Logo" width="34" height="34" />
          <span className="brand-text fs-4">JobFinder</span>
        </Link>

        <Link to="/" className="nav-link fw-semibold">
          Accueil
        </Link>

        <div className="d-flex gap-2">
          {!user && (
            <button className="btn btn-outline-grad rounded-pill px-3">
              Inscription
            </button>
          )}

          {user ? (
            <button className="btn btn-grad rounded-pill px-3" onClick={logout}>
              Déconnexion
            </button>
          ) : (
            <Link to="/login" className="btn btn-grad rounded-pill px-3">
              CONNEXION
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
