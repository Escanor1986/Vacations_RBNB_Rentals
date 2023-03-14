import styles from "./Header.module.scss";
import LOGO from "../assets/images/LOGO.png";

function Header() {
  return (
    <header className={`${styles.header} d-flex flex-row align-items-center`}>
      <div className="flex-fill">
        <img src={LOGO} alt="Logo Kasa" />
      </div>
      <ul>
        <button className="mr-5 btn btn-reverse-primary">
          <i class="fa-solid fa-house mr-15"></i>
          <span>Accueil</span>
        </button>
        <button className="mr-5 btn btn btn-reverse-primary">
          <i class="fa-solid fa-book-open mr-15"></i>
          <span>A propos</span>
        </button>
        <button className="mr-5 btn btn btn-reverse-primary">
          <i class="fa-solid fa-basket-shopping mr-15"></i>
          <span>Wishlist</span>
        </button>
        <button className="btn btn btn-primary">
          <i class="fa-solid fa-right-to-bracket mr-15"></i>
          <span>Connexion</span>
        </button>
      </ul>
    </header>
  );
}

export default Header;
