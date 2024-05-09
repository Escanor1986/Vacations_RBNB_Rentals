import styles from "./Header.module.scss";
import LOGO from "../../assets/images/Logo_1.png";
import { useState } from "react";
import HeaderMenu from "./components/HeaderMenu/HeaderMenu";
import { NavLink } from "react-router-dom";

function Header() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className={`${styles.header} d-flex flex-row align-items-center`}>
      <div className="flex-fill">
        <NavLink to="/">
          <img src={LOGO} alt="Logo Kasa" />
        </NavLink>
      </div>
      <ul className={`${styles.headerList}`}>
        <NavLink className="btn" to="/">
          <button className="btn btn-reverse-primary">
            <i className="fa-solid fa-house mr-15"></i>
            <span>Accueil</span>
          </button>
        </NavLink>
        <NavLink className="btn" to="/apropos">
          <button className="btn btn-reverse-primary">
            <i className="fa-solid fa-book-open mr-15"></i>
            <span>A propos</span>
          </button>
        </NavLink>
        <NavLink className="btn" to="/wishlist">
          <button className="btn btn-reverse-primary">
            <i className="fa-solid fa-heart mr-15"></i>
            <span>Wishlist</span>
          </button>
        </NavLink>
        <NavLink className="btn" to="/admin">
          <button className="btn btn-reverse-primary">
            <i className="fa-solid fa-lock mr-15"></i>
            <span>Admin</span>
          </button>
        </NavLink>
        <NavLink className="btn" to="/login">
          <button className="btn btn-reverse-primary">
            <i className="fa-solid fa-right-to-bracket mr-15"></i>
            <span>Login</span>
          </button>
        </NavLink>
        <NavLink className="btn" to="/signup">
          <button className="btn btn-reverse-primary">
            <i className="fa-solid fa-user-plus mr-15"></i>
            <span>Sign Up</span>
          </button>
        </NavLink>
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
