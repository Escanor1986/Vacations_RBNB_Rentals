import { useState } from "react";
import { signup } from "../../apis/rental";
import { useNavigate } from "react-router-dom";
import styles from "./SignupPage.module.scss";
import TOP_CONTENT from "../../assets/images/Top_Content_Img_2.png";

import logo from "../../assets/images/Logo_1.png";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const message = await signup(email, password);
      alert(message);
      setEmail(""); // Réinitialise le champ de saisie email
      setPassword(""); // Réinitialise le champ de saisie mot de passe
      setError(""); // Réinitialise le message d'erreur
      navigate("/login");
    } catch (error) {
      console.error("Failed to signup:", error);
      setError("Failed to signup. Please check your personal informations.");
    }
  };

  return (
    <div className="mx-40 container flex-fill d-flex flex-column justify-content-center align-items-center">
    <div className={`mt-20 mb-20 ${styles.mainImageContainer}`}>
      <img
        src={TOP_CONTENT}
        alt="Top Content"
        className={`${styles.mainImage}`}
      />
    </div>
    <div className={styles.container}>
      <div className={styles.card}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <h2>Create your account</h2>
        {error && <p className="text-danger">{error}</p>}
        <form>
          <div className={styles["form-group"]}>
          <label className={styles["signup-label"]}>Email:</label>

            <input
              type="email"
              className="form-control"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className={styles["form-group"]}>
          <label className={styles["signup-label"]}>Password:</label>

            <input
              type="password"
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <button
            type="button"
            className={`btn btn-primary ${styles["btn-primary"]}`}
            onClick={handleSignup}
          >
            Signup
          </button>
        </form>
        <p className={`text-secondary ${styles["text-secondary"]}`}>
          Already have an account?{" "}
          <span
            className={styles["text-link"]}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
    </div>
  );
}

export default SignupPage;
