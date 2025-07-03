import React, { useState } from "react";
import { FaSun, FaMoon, FaUser, FaUserTie } from "react-icons/fa";

const Header = ({ darkMode, onToggleDarkMode, currentRole, onToggleRole }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <header
      className={`py-4 px-6 shadow-lg ${
        darkMode ? "bg-stone-900 text-stone-100" : "bg-stone-100 text-stone-900"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          {imageError ? (
            <FaUser
              className="w-10 h-10 rounded-full flex items-center justify-center text-stone-500 mr-3"
              size={30}
            />
          ) : (
            <img
              src="./images/team.jpg"
              alt="Team Pulse Logo"
              className="w-10 h-10 rounded-full mr-3 object-cover"
              onError={handleImageError}
            />
          )}
          <h1 className="text-2xl font-bold">Team Pulse</h1>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleRole}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              currentRole === "lead"
                ? "bg-stone-600 text-stone-100"
                : "bg-stone-300 text-stone-800 hover:bg-stone-400"
            }`}
          >
            {currentRole === "lead" ? (
              <FaUser className="mr-2" />
            ) : (
              <FaUserTie className="mr-2" />
            )}
            {currentRole === "lead" ? "Member View" : "Lead View"}
          </button>

          <button
            onClick={onToggleDarkMode}
            className={`p-2 rounded-full focus:outline-none transition-colors ${
              darkMode
                ? "bg-stone-700 text-amber-300"
                : "bg-stone-200 text-stone-700"
            }`}
            aria-label="Toggle theme"
          >
            {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
