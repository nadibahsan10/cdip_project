"use client";
import React, { useState } from "react";
import Link from "next/link";
import Modal from "@/app/Components/Modal";
import { useAuth } from "@/app/context/AuthContext";
import Cookies from "js-cookie";

const SignUpPage = () => {
  const { login } = useAuth(); // Use the login function from AuthContext
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const { token } = data; // Assuming the API response includes a token

        // Store user information in cookies
        const userData = { username, email, admin: false };
        Cookies.set("user", JSON.stringify(userData), { expires: 7 });
        Cookies.set("token", token, { expires: 7 });

        // Update the context
        login({ username, email, token, admin: false });

        setShowModal(true);
      } else {
        setError(data.error || "An error occurred. Please try again.");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
      <div className="h-[500px] w-[400px] bg-white rounded-lg shadow-xl p-8 flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        {error && <div className="text-red-500 text-center">{error}</div>}
        <div className="text-center text-sm text-gray-600">
          <p>
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
      {showModal && (
        <Modal message="User registered successfully!" onClose={closeModal} />
      )}
    </div>
  );
};

export default SignUpPage;
