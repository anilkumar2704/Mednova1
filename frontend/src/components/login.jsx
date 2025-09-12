import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { setToken } from "../API/api"; // 👈 import API helper

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");   // 👈 changed userId -> email
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call backend login API
            const { data } = await api.post("/auth/login", { email, password });

            // Save token for authenticated requests
            setToken(data.token);
            localStorage.setItem("token", data.token);

            // Redirect after successful login
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Invalid username or password!");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-xl">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Login
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-1 px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-1 px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Enter password"
                        />
                    </div>

                    {error && <p className="text-sm text-red-500">{error}</p>}

                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
