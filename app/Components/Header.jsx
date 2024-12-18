"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { auth, logout } = useAuth();

  return (
    <header className="w-full h-20 bg-blue-500 fixed top-0 z-40 shadow-lg px-6 lg:px-24 flex items-center">
      <nav className="flex justify-between items-center w-full">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="text-3xl lg:text-4xl font-bold font-mono text-white"
          >
            AppleStore
          </Link>
        </div>

        {/* Navigation Links or User Info */}
        {!auth.isLoggedIn ? (
          <Link
            href="/auth/login"
            className="px-6 py-2 bg-white rounded-lg text-blue-700 font-medium hover:bg-blue-700 hover:text-white transition duration-300"
          >
            LOGIN
          </Link>
        ) : (
          <div className="flex items-center space-x-6">
            <h1 className="text-white text-lg font-semibold">
              Welcome, {auth.username}
            </h1>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 rounded-lg text-white font-medium hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          </div>
        )}
        {auth.admin && (
          <div className="flex items-center space-x-6">
            <Link
              href="/admin"
              className="px-4 py-2 bg-sky-400 rounded-lg text-white font-medium hover:bg-sky-600 transition duration-300"
            >
              Add Product
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
