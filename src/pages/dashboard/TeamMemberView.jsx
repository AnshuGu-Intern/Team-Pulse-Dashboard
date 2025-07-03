import React from "react";
import { useSelector } from "react-redux";
import StatusBadge from "../../components/StatusBadge";

const TeamMemberView = () => {
  const darkMode = useSelector((state) => state.ui.darkMode);
  const currentUser = useSelector((state) => state.role.currentUser);
  const members = useSelector((state) => state.members);

  const currentMember = members.find((m) => m.name === currentUser);

  if (!currentMember) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <div
        className={`p-6 rounded-xl shadow-lg ${
          darkMode ? "bg-stone-700" : "bg-white"
        }`}
      >
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 rounded-full bg-stone-300 dark:bg-stone-600 mr-4 flex items-center justify-center text-xl font-bold">
            {currentMember.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{currentMember.name}</h2>
            <StatusBadge status={currentMember.status} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberView;
