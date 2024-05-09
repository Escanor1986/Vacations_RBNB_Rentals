import styles from "./HeaderMenu.module.scss";
import { NavLink } from "react-router-dom";

function HeaderMenu() {
  return (
    <ul className={`${styles.MenuContainer} card p-20`}>
      <li>
        <NavLink to="/#/">Accueil</NavLink>
      </li>
      <li>
        <NavLink to="/#/apropos">A Propos</NavLink>
      </li>
      <li>Wishlist</li>
      <li>
        <NavLink to="/#/admin">Admin</NavLink>
      </li>
      <li>
        <NavLink to="/#/login">Connexion</NavLink>
      </li>
    </ul>
  );
}

export default HeaderMenu;
