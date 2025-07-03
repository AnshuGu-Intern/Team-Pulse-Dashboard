import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../store/slices/uiSlice";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.ui.darkMode);

  const handleToggle = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <button
      onClick={handleToggle}
      className={`p-2 rounded-full focus:outline-none transition-colors duration-300 ${
        darkMode ? "bg-stone-700 text-amber-300" : "bg-stone-200 text-stone-700"
      }`}
      aria-label="Toggle theme"
    >
      {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
    </button>
  );
};

export default ThemeToggle;
