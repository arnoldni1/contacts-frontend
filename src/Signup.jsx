// Signup.jsx
import React, { useState } from "react";
import { BASE_URL } from "./config.js";
export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSignup = async (e) => {
        e.preventDefault();
        setMessage("");
        if (!email.trim() || !password.trim()) {
            setMessage("Email and password are required.");
            return;
        }
        try {
            setLoading(true);
            const res = await fetch(`${BASE_URL}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json().catch(() => null);
            if (res.ok) {
                setMessage("Signup successful. You can now log in.");
                setEmail("");
                setPassword("");
            } else {
                // backend uses { detail: "..." }
                setMessage(data?.detail || "Signup failed.");
            }
        } catch (err) {
            setMessage("Network error: " + err.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div style={{ padding: "20px" }}>
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
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
                    {loading ? "Signing up..." : "Signup"}
                </button>
            </form>
            {message && (
                <p style={{ marginTop: "15px", color: "blue" }}>{message}</p>
            )}
        </div>
    );

}
