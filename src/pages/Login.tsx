import { useState } from "react";
import "./Login.css";
import CustomInput from "../components/CustomInput";
import WrongCredentialsModal from "../components/WrongCredentialsModal";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useApiContext } from "../contexts/ApiContext";

export default function Login() {
  const apiClient = useApiContext();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState({
    username: false,
    password: false,
  });
  const [showErrorModal, setShowErrorModal] = useState(true); // Display for now
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;

    setIsLoading(true);

    // TODO: Implement actual login functionality
    try {
      const response:
        | { accessToken: string; refreshToken: string }
        | undefined = await apiClient
        ?.setEndpoint("/api/auth/login")
        .setMethod("POST")
        .setBody(
          JSON.stringify({
            username,
            password,
          })
        )
        .request();

      if (!response) {
        throw new Error("Failed to login");
      }

      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
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
    <div className=" bg-red-50 flex items-center justify-center p-20 rounded-lg shadow-md">
      <div className="w-full shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Login</h1>
        </div>
        <br />
        <div className="bg-white rounded-lg shadow-md p-10">
          <form onSubmit={handleLogin} className="space-y-6">
            <CustomInput
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => setTouched({ ...touched, username: true })}
              required
              errorMessage="Username is required"
              showError={isUsernameInvalid}
            />

            <CustomInput
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched({ ...touched, password: true })}
              required
              errorMessage="Password is required"
              showError={isPasswordInvalid}
            >
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none transition-colors"
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </CustomInput>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-blue-500 hover:text-blue-600">
                Forgot?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading || !username.trim() || !password.trim()}
            >
              {isLoading ? "შესვლა..." : "შესვლა"}
            </button>
          </form>
        </div>
      </div>

      <WrongCredentialsModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
      />
    </div>
  );
}
