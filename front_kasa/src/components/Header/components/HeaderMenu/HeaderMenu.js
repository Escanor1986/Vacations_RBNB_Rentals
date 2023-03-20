import styles from "./HeaderMenu.module.scss";

function HeaderMenu({ setPage }) {
  return (
    <ul className={`${styles.MenuContainer} card p-20`}>
      <li onClick={() => setPage("homepage")}>Accueil</li>
      <li>A Propos</li>
      <li>Wishlist</li>
      <li onClick={() => setPage("admin")}>Ajouter une location</li>
      <li>Connexion</li>
    </ul>
  );
}

export default HeaderMenu;
