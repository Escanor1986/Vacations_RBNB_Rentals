import styles from "./Footer.module.scss";
import LOGO from "../../assets/images/Logo_1.png";

function Footer() {
  return (
    <footer
      className={`${styles.footer} d-flex flex-row align-items-center justify-content-center p-20`}
    >
      <div className="d-flex flex-column align-items-center justify-content-center">
        <div>
          <img src={LOGO} alt="Logo" />
        </div>
        <p>Copyright © 2023 Escanor, Inc.</p>
      </div>
    </footer>
  );
}

export default Footer;
