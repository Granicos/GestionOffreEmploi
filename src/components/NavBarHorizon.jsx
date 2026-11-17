import { Link } from "react-router";

function Navbar() {
  return (
    <nav className="navbar bg-light shadow-sm text-center">
      <div className="container text-center">
        <img src="../public/favicon.svg" alt="Logo" />
        <Link to="/" className="nav-link">
          Accueil
        </Link>
        <button className="btn btn-outline-primary">INSCRIPTION</button>
        <button className="btn btn-outline-secondary">
          CONNEXION / DECONNEXION
        </button>
      </div>
    </nav>
  );
}
export default Navbar;
