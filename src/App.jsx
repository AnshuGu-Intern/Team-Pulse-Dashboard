import React, { useState } from "react";
import Header from "./components/Header";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentRole, setCurrentRole] = useState("member");

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleRole = () =>
    setCurrentRole(currentRole === "lead" ? "member" : "lead");

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-stone-800 text-stone-100" : "bg-stone-50 text-stone-900"
      }`}
    >
      <Header
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        currentRole={currentRole}
        onToggleRole={toggleRole}
      />
      <main className="container mx-auto px-4 py-8">
        {/* Content will go here */}
      </main>
    </div>
  );
}

export default App;
