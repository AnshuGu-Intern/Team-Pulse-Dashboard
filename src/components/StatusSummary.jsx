import React from "react";
import { useSelector } from "react-redux";

const StatusSummary = () => {
  const members = useSelector((state) => state.members);
  const darkMode = useSelector((state) => state.ui.darkMode);

  const allStatuses = ["working", "break", "meeting", "offline"];

  const statusCounts = allStatuses.reduce((acc, status) => {
    acc[status] = members.filter((m) => m.status === status).length;
    return acc;
  }, {});

  const statusColors = {
    working: "bg-emerald-500",
    break: "bg-amber-400",
    meeting: "bg-indigo-500",
    offline: "bg-stone-400",
  };

  const statusLabels = {
    working: "Working",
    break: "Break",
    meeting: "Meeting",
    offline: "Offline",
  };

  return (
    <div
      className={`p-4 h-full rounded-xl shadow-lg flex flex-col ${
        darkMode ? "bg-stone-700" : "bg-white"
      }`}
    >
      <h3 className="text-lg font-semibold mb-3">Status Summary</h3>
      <div className="grid grid-cols-2 gap-3 flex-grow">
        {allStatuses.map((status) => (
          <div
            key={status}
            className={`flex flex-col justify-between items-start p-4 rounded-lg cursor-pointer transition-colors duration-200
              ${
                darkMode
                  ? "bg-stone-600 hover:bg-stone-500"
                  : "bg-stone-100 hover:bg-stone-200"
              }
              ${
                darkMode ? "border border-stone-500" : "border border-stone-200"
              }
            `}
          >
            <div className="flex items-center mb-2">
              <div
                className={`w-4 h-4 rounded-full ${statusColors[status]} mr-2`}
              ></div>
              <span className="text-2xl font-bold">{statusCounts[status]}</span>
            </div>

            <span
              className={`text-sm font-medium ${
                darkMode ? "text-stone-300" : "text-stone-600"
              }`}
            >
              {statusLabels[status]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusSummary;
