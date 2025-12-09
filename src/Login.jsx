// Login.jsx
import React, { useState } from "react";
import { BASE_URL } from "./config.js";
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const storedToken = localStorage.getItem("token");

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage("");
        if (!email.trim() || !password.trim()) {
            setMessage("Email and password are required.");
            return;
        }
        try {
            setLoading(true);
            const res = await fetch(`${BASE_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json().catch(() => null);
            if (res.ok && data?.token) {
                // Store token in localStorage
                localStorage.setItem("token", data.token);
                setMessage("Login successful. You can now add contacts.");
                setPassword("");
                // (you can also clear email or keep it)
            } else {
                setMessage(data?.detail || "Login failed.");
            }
        } catch (err) {
            setMessage("Network error: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: "10px" }}>
                    <label>
                        Email:&nbsp;
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                        />
                    </label>
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label>
                        Password:&nbsp;
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="********"
                        />
                    </label>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
            {message && (
                <p style={{ marginTop: "15px", color: "blue" }}>{message}</p>
            )}
            {storedToken && (
                <p style={{ marginTop: "10px", fontSize: "0.9rem" }}>
                    <strong>Stored token:</strong>{" "}
                    {storedToken.substring(0, 25)}...
                </p>
            )}
        </div>
    );

}