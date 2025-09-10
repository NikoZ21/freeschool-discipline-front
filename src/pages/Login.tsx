import { useState } from "react";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;

    console.log(username, password);

    setIsLoading(true);

    // TODO: Implement actual login functionality
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
  };

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
              className="form-input"
              placeholder="შეიყვანეთ მომხმარებლის სახელი"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              პაროლი
            </label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="შეიყვანეთ პაროლი"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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
