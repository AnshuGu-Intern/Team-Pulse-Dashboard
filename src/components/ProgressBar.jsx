import React from "react";
import { useSelector } from "react-redux";

const ProgressBar = ({ progress }) => {
  const darkMode = useSelector((state) => state.ui.darkMode);

  const getProgressColor = (progress) => {
    if (progress < 30) return "bg-red-500";
    if (progress < 70) return "bg-amber-500";
    return "bg-emerald-500";
  };

  return (
    <div
      className={`w-full rounded-full h-2 ${
        darkMode ? "bg-stone-800" : "bg-stone-200"
      }`}
    >
      <div
        className={`h-2 rounded-full ${getProgressColor(
          progress
        )} transition-all duration-500`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
