import React from "react";

const StatusBadge = ({ status }) => {
  const statusColors = {
    working: "bg-emerald-500",
    break: "bg-amber-400",
    meeting: "bg-indigo-500",
    offline: "bg-stone-400",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[status]} text-stone-900`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;
