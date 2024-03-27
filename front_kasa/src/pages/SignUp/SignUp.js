// SignupPage.js
import { useState } from "react";
import { signup } from "../../apis/rental";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    try {
      const message = await signup(email, password);
      alert(message);
    } catch (error) {
      console.error("Failed to signup:", error);
      setError("Failed to login. Please check your personal informations.");
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default SignupPage;
