import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStatus } from "../../store/slices/membersSlice";
import { FaPlay, FaCoffee, FaUsers, FaPowerOff } from "react-icons/fa";
import StatusBadge from "../../components/StatusBadge";

const TeamMemberView = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.ui.darkMode);
  const currentUser = useSelector((state) => state.role.currentUser);
  const members = useSelector((state) => state.members);

  const currentMember = members.find((m) => m.name === currentUser);

  const handleStatusChange = (status) => {
    dispatch(
      updateStatus({
        id: currentMember.id,
        status,
      })
    );
  };

  if (!currentMember) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <div
        className={`p-6 rounded-xl shadow-lg mb-6 ${
          darkMode ? "bg-stone-700" : "bg-white"
        }`}
      >
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-stone-300 dark:bg-stone-600 mr-4 flex items-center justify-center text-xl font-bold">
            {currentMember.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{currentMember.name}</h2>
            <StatusBadge status={currentMember.status} />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { status: "working", icon: <FaPlay />, label: "Working" },
            { status: "break", icon: <FaCoffee />, label: "Break" },
            { status: "meeting", icon: <FaUsers />, label: "Meeting" },
            { status: "offline", icon: <FaPowerOff />, label: "Offline" },
          ].map((item) => (
            <button
              key={item.status}
              onClick={() => handleStatusChange(item.status)}
              className={`flex flex-col items-center p-3 rounded-lg ${
                currentMember.status === item.status
                  ? item.status === "working"
                    ? "bg-emerald-500"
                    : item.status === "break"
                    ? "bg-amber-400"
                    : item.status === "meeting"
                    ? "bg-indigo-500"
                    : "bg-stone-400"
                  : darkMode
                  ? "bg-stone-600 hover:bg-stone-500"
                  : "bg-stone-100 hover:bg-stone-200"
              }`}
            >
              <span className="text-lg mb-1">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamMemberView;
