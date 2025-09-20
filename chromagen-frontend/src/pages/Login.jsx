import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, saveToken } from "../utils/auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const tokens = await loginUser(username, password); // calls /users/login/
      saveToken(tokens.access, tokens.refresh);
      alert("Welcome!");
      navigate("/"); // ✅ redirect to home (Palette)
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
