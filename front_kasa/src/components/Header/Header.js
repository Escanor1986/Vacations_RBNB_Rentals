import styles from "./Header.module.scss";
import LOGO from "../../assets/images/LOGO.png";
import { useState } from "react";
import HeaderMenu from "./components/HeaderMenu/HeaderMenu";

function Header() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className={`${styles.header} d-flex flex-row align-items-center`}>
      <div className="flex-fill">
        <img src={LOGO} alt="Logo Kasa" />
      </div>
      <ul className={styles.headerList}>
        <button className="mr-5 btn btn-reverse-primary">
          <i class="fa-solid fa-house mr-15"></i>
          <span>Accueil</span>
        </button>
        <button className="mr-5 btn btn btn-reverse-primary">
          <i class="fa-solid fa-book-open mr-15"></i>
          <span>A propos</span>
        </button>
        <button className="mr-5 btn btn btn-reverse-primary">
          <i class="fa-solid fa-heart mr-15"></i>
          <span>Wishlist</span>
        </button>
        <button className="btn btn btn-primary">
          <i class="fa-solid fa-right-to-bracket mr-15"></i>
          <span>Connexion</span>
        </button>
      </ul>
      <i
        onClick={() => setShowMenu(true)}
        className={`fa-solid fa-bars ${styles.headerXs}`}
      ></i>
      {showMenu && (
        <>
          <div onClick={() => setShowMenu(false)} className="calc"></div>
          <HeaderMenu />
        </>
      )}
    </header>
  );
}

export default Header;
