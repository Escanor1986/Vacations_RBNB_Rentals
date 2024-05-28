import { useState } from "react";
import { login } from "../../apis/rental";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.scss";
import logo from "../../assets/images/Logo_1.png";
import TOP_CONTENT from "../../assets/images/Top_Content_Img_6.png";


function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const token = await login(email, password);
      localStorage.setItem("token", token);
      navigate("/");
      alert("Login successful!");
    } catch (error) {
      console.error("Failed to login:", error);
      setError("Failed to login. Please check your credentials.");
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
        <h2>Login to your account</h2>
        {error && <p className="text-danger">{error}</p>}
        <form>
          <div className={styles["form-group"]}>
            <label className={styles["login-label"]}>Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className={styles["form-group"]}>
          <label className={styles["login-label"]}>Password:</label>

            <input
              type="password"
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <button
            type="button"
            className={`btn btn-primary ${styles["btn-primary"]}`}
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
        <p className={`text-secondary ${styles["text-secondary"]}`}>
          Do not have an account?{" "}
          <span
            className={styles["text-link"]}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
    </div>
  );
}

export default LoginPage;
