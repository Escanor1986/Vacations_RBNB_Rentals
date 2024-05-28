import styles from "./HeaderMenu.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function HeaderMenu() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <ul className={`${styles.MenuContainer} card p-20`}>
      <li>
        <NavLink to="/">Accueil</NavLink>
      </li>
      <li>
        <NavLink to="/apropos">A Propos</NavLink>
      </li>
      <li>
        <NavLink to="/wishlist">Wish List</NavLink>
      </li>
      {isAuthenticated ? (
        <>
          <li>
            <NavLink to="/admin">Admin</NavLink>
          </li>
          <li>
            <button onClick={handleLogout} className="btn btn-reverse-primary">Déconnexion</button>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to="/login">Connexion</NavLink>
          </li>
          <li>
            <NavLink to="/signup">Inscription</NavLink>
          </li>
        </>
      )}
    </ul>
  );
}

export default HeaderMenu;
