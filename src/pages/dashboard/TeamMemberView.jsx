import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStatus } from "../../store/slices/membersSlice";
import { updateProgress } from "../../store/slices/tasksSlice";
import StatusBadge from "../../components/StatusBadge";
import {
  FaPlay,
  FaCoffee,
  FaUsers,
  FaPowerOff,
  FaPlus,
  FaMinus,
  FaCheck,
} from "react-icons/fa";

const TeamMemberView = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.ui.darkMode);
  const currentUser = useSelector((state) => state.role.currentUser);
  const members = useSelector((state) => state.members);

  const currentMember = members.find((m) => m.name === currentUser);

  const tasks = useSelector((state) => state.tasks);

  const memberTasks = tasks.filter(
    (task) => task.memberId === currentMember?.id
  );

  const handleProgressChange = (taskId, amount) => {
    dispatch(updateProgress({ id: taskId, amount }));
  };

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
      <div
        className={`p-6 rounded-xl shadow-lg ${
          darkMode ? "bg-stone-700" : "bg-white"
        }`}
      >
        <h2 className="text-xl font-bold mb-4">Your Tasks</h2>
        {memberTasks.length > 0 ? (
          <div className="space-y-4">
            {memberTasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 rounded-lg ${
                  darkMode ? "bg-stone-600" : "bg-stone-100"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{task.title}</h3>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      task.progress === 100
                        ? "bg-emerald-500 text-stone-900"
                        : darkMode
                        ? "bg-stone-500"
                        : "bg-stone-200"
                    }`}
                  >
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center mb-3">
                  <div className="w-full bg-stone-200 dark:bg-stone-500 rounded-full h-2 mr-3">
                    <div
                      className={`h-2 rounded-full ${
                        task.progress < 30
                          ? "bg-red-500"
                          : task.progress < 70
                          ? "bg-amber-500"
                          : "bg-emerald-500"
                      }`}
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{task.progress}%</span>
                </div>

                <div className="flex justify-between">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleProgressChange(task.id, -10)}
                      disabled={task.progress <= 0}
                      className={`p-2 rounded-full ${
                        darkMode
                          ? "bg-stone-500 hover:bg-stone-400"
                          : "bg-stone-200 hover:bg-stone-300"
                      } ${
                        task.progress <= 0
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <FaMinus />
                    </button>
                    <button
                      onClick={() => handleProgressChange(task.id, 10)}
                      disabled={task.progress >= 100}
                      className={`p-2 rounded-full ${
                        darkMode
                          ? "bg-stone-500 hover:bg-stone-400"
                          : "bg-stone-200 hover:bg-stone-300"
                      } ${
                        task.progress >= 100
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <FaPlus />
                    </button>
                  </div>

                  {task.progress === 100 && (
                    <div className="flex items-center text-emerald-500 text-sm">
                      <FaCheck className="mr-1" />
                      <span>Completed!</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p
            className={`text-center py-6 ${
              darkMode ? "text-stone-400" : "text-stone-500"
            }`}
          >
            No tasks assigned yet
          </p>
        )}
      </div>
    </div>
  );
};

export default TeamMemberView;
