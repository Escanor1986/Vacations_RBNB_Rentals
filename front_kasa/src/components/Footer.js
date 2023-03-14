import styles from "./Footer.module.scss";
import LOGO from "../assets/images/LOGO_FOOTER.png";

function Footer() {
  return (
    <footer
      className={`${styles.footer} d-flex flex-row align-items-center justify-content-center p-20`}
    >
      <div className="d-flex flex-column align-items-center justify-content-center">
        <div>
          <img src={LOGO} alt="Logo Kasa" />
        </div>
        <p>Copyright © 2023 Kasa Escanor, Inc.</p>
      </div>
    </footer>
  );
}

export default Footer;
