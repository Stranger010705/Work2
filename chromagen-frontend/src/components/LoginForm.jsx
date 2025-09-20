import { useState } from "react";
import { loginUser, saveToken } from "../utils/auth";

function LoginForm({ onSwitchToRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginUser(username, password);
      saveToken(res.access, res.refresh);
      alert("✅ Logged in successfully!");
      window.location.reload(); // reload App so it shows the logged-in state
    } catch (err) {
      alert("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="bg-white p-6 rounded-lg shadow-md max-w-sm mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 rounded"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      <p className="text-sm mt-3">
        Don’t have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-blue-600 underline"
        >
          Register
        </button>
      </p>
    </form>
  );
}

export default LoginForm;
