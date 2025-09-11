import { useState } from "react";
import "./Login.css";
import { ApiClient } from "../api/client";

const apiClient = new ApiClient();

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState({
    username: false,
    password: false,
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;

    console.log(username, password);

    setIsLoading(true);

    // TODO: Implement actual login functionality
    try {
      const response = await apiClient.post("/api/auth/login", {
        username,
        password,
      });

      console.log(response);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log("Login.tsx error >> ", err.message);
      } else {
        console.log("Login.tsx error >> ", err);
      }
    }

    setIsLoading(false);
  };

  const isUsernameInvalid = touched.username && !username.trim();
  const isPasswordInvalid = touched.password && !password.trim();

  return (
    <div className="login-page">
      <div className="login-form-section">
        <h1 className="login-title">დისციპლინარული ბაზა</h1>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              მომხმარებლის სახელი
            </label>

            <input
              id="username"
              type="text"
              className={`form-input ${
                isUsernameInvalid ? "form-input-error" : ""
              }`}
              placeholder="შეიყვანეთ მომხმარებლის სახელი"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              onBlur={() => setTouched({ ...touched, username: true })}
            />

            {isUsernameInvalid && (
              <p className="error-message">მომხმარებლის სახელი აუცილებელია</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              პაროლი
            </label>
            <input
              id="password"
              type="password"
              className={`form-input ${
                isPasswordInvalid ? "form-input-error" : ""
              }`}
              placeholder="შეიყვანეთ პაროლი"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              onBlur={() => setTouched({ ...touched, password: true })}
            />

            {isPasswordInvalid && (
              <p className="error-message">პაროლი აუცილებელია</p>
            )}
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={isLoading || !username.trim() || !password.trim()}
          >
            {isLoading ? "შესვლა..." : "შესვლა"}
          </button>
        </form>
      </div>
    </div>
  );
}
