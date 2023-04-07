import styles from "./NotFound.module.scss";
import { NavLink } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex-fill d-flex flex-column justify-content-center align-items-center">
      <h1 className={`${styles.title}`}>404</h1>
      <p className={`${styles.text}`}>
        Oups! La page que vous demandez n'existe pas.
      </p>
      <NavLink to="/">
        <p className={`${styles.link}`}>Retourner sur la page d'accueil</p>
      </NavLink>
    </div>
  );
}

export default NotFound;
