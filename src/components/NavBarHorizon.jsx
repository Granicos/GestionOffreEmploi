import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="navbar bg-light shadow-sm text-center">
      <div className="container text-center">
        <img src="../favicon.svg" alt="Logo" />
        <Link to="/" className="nav-link">
          Accueil
        </Link>

        {!user && (
          <button className="btn btn-outline-primary">INSCRIPTION</button>
        )}

        {user ? (
          <button className="btn btn-outline-secondary" onClick={logout}>
            Déconnexion
          </button>
        ) : (
          <Link to="/login" className="btn btn-outline-secondary">
            CONNEXION
          </Link>
        )}
      </div>
    </nav>
  );
}
export default Navbar;
