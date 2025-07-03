import React from "react";

const ProgressBar = ({ progress }) => {
  const getColor = (progress) => {
    if (progress < 30) return "bg-red-500";
    if (progress < 70) return "bg-amber-500";
    return "bg-emerald-500";
  };

  return (
    <div className="w-full bg-stone-200 dark:bg-stone-700 rounded-full h-2">
      <div
        className={`h-2 rounded-full ${getColor(
          progress
        )} transition-all duration-500`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
