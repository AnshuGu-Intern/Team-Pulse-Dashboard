import React, { useState } from "react";
import { useSelector } from "react-redux";
import ThemeToggle from "./ThemeToggle";
import RoleSwitcher from "./RoleSwitcher";
import { FaUser } from "react-icons/fa";

const Header = () => {
  const darkMode = useSelector((state) => state.ui.darkMode);
  const currentRole = useSelector((state) => state.role.currentRole);
  const currentUser = useSelector((state) => state.role.currentUser);

  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <header
      className={`py-3 px-4 shadow-lg transition-colors duration-300 ${
        darkMode ? "bg-stone-900 text-stone-100" : "bg-stone-100 text-stone-900"
      }`}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center w-full sm:w-auto justify-center sm:justify-start">
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
          <h1 className="text-xl sm:text-2xl font-bold">Team Pulse</h1>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-2 w-full sm:w-auto">
          <div
            className={`px-2 py-1 rounded-full text-xs whitespace-nowrap ${
              currentRole === "lead"
                ? "bg-amber-500 text-stone-900"
                : "bg-emerald-500 text-white"
            }`}
          >
            {currentRole === "lead" ? "Team Lead" : "Member"}
          </div>

          <span className="font-medium text-sm sm:text-base whitespace-nowrap">
            {currentUser}
          </span>

          <RoleSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
