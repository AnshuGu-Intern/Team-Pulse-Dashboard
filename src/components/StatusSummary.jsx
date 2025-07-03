import React from "react";
import { useSelector } from "react-redux";

const StatusSummary = () => {
  const members = useSelector((state) => state.members);
  const darkMode = useSelector((state) => state.ui.darkMode);

  const statusCounts = members.reduce((acc, member) => {
    acc[member.status] = (acc[member.status] || 0) + 1;
    return acc;
  }, {});

  const statusColors = {
    working: "bg-emerald-500",
    break: "bg-amber-400",
    meeting: "bg-indigo-500",
    offline: "bg-stone-400",
  };

  return (
    <div
      className={`p-4 rounded-xl mb-6 grid grid-cols-2 sm:grid-cols-4 gap-4 ${
        darkMode ? "bg-stone-700" : "bg-stone-200"
      }`}
    >
      {Object.entries(statusCounts).map(([status, count]) => (
        <div key={status} className="flex items-center">
          <div
            className={`w-3 h-3 rounded-full ${statusColors[status]} mr-2`}
          ></div>
          <span className="font-medium">{count}</span>
          <span
            className={`ml-1 capitalize ${
              darkMode ? "text-stone-300" : "text-stone-600"
            }`}
          >
            {status}
          </span>
        </div>
      ))}
    </div>
  );
};

export default StatusSummary;
