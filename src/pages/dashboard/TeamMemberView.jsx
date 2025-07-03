import { useDispatch, useSelector } from "react-redux";
import { updateStatus } from "../../store/slices/membersSlice";
import { updateProgress } from "../../store/slices/tasksSlice";
import StatusBadge from "../../components/StatusBadge";
import ProgressBar from "../../components/ProgressBar";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
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
  const tasks = useSelector((state) => state.tasks);

  // Find current user's data
  const currentMember = members.find((m) => m.name === currentUser);
  const userTasks = currentMember
    ? tasks.filter((task) => task.memberId === currentMember.id)
    : [];

  // Status options
  const statusOptions = [
    {
      id: "working",
      label: "Working",
      icon: <FaPlay />,
      color: "bg-emerald-500",
    },
    { id: "break", label: "Break", icon: <FaCoffee />, color: "bg-amber-500" },
    {
      id: "meeting",
      label: "Meeting",
      icon: <FaUsers />,
      color: "bg-indigo-500",
    },
    {
      id: "offline",
      label: "Offline",
      icon: <FaPowerOff />,
      color: "bg-stone-500",
    },
  ];

  // Handle status change
  const handleStatusChange = (status) => {
    if (currentMember) {
      dispatch(
        updateStatus({
          id: currentMember.id,
          status,
        })
      );
    }
  };

  // Handle progress update
  const handleProgressChange = (taskId, amount) => {
    dispatch(updateProgress({ id: taskId, amount }));
  };

  if (!currentMember) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
          darkMode
            ? "bg-stone-800 text-stone-100"
            : "bg-stone-50 text-stone-900"
        }`}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-400 mx-auto mb-4"></div>
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-stone-800 text-stone-100" : "bg-stone-50 text-stone-900"
      }`}
    >
      <div className="container mx-auto px-3 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Status Section */}
          <div
            className={`mb-6 p-4 rounded-xl shadow-lg transition-colors duration-300 ${
              darkMode ? "bg-stone-700" : "bg-white"
            }`}
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-stone-300 dark:bg-stone-600 mr-3 flex items-center justify-center text-lg font-bold">
                {currentMember.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-bold">{currentMember.name}</h2>
                <div className="mt-1">
                  <StatusBadge status={currentMember.status} />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <p
                className={`text-sm mb-2 ${
                  darkMode ? "text-stone-300" : "text-stone-600"
                }`}
              >
                Update your status:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {statusOptions.map((status) => (
                  <motion.button
                    key={status.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleStatusChange(status.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl transition-colors duration-300 ${
                      currentMember.status === status.id
                        ? `${status.color} text-stone-900`
                        : darkMode
                        ? "bg-stone-600 hover:bg-stone-500"
                        : "bg-stone-100 hover:bg-stone-200"
                    }`}
                  >
                    <span className="text-lg mb-1">{status.icon}</span>
                    <span className="text-xs sm:text-sm font-medium">
                      {status.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Tasks Section */}
          <div
            className={`p-4 rounded-xl shadow-lg transition-colors duration-300 ${
              darkMode ? "bg-stone-700" : "bg-white"
            }`}
          >
            <h2 className="text-xl font-bold mb-4">Your Tasks</h2>

            {userTasks.length === 0 ? (
              <div className="text-center py-6">
                <div
                  className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
                    darkMode ? "bg-stone-600" : "bg-stone-200"
                  }`}
                >
                  <FaCheck className="text-2xl" />
                </div>
                <p
                  className={`${
                    darkMode ? "text-stone-400" : "text-stone-500"
                  }`}
                >
                  No tasks assigned. Enjoy your day!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {userTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-3 rounded-lg transition-colors duration-300 ${
                      darkMode ? "bg-stone-600" : "bg-stone-100"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-sm sm:text-base">
                        {task.title}
                      </h3>
                      <div
                        className={`px-2 py-1 rounded text-xs ${
                          task.progress === 100
                            ? "bg-emerald-500 text-stone-900"
                            : darkMode
                            ? "bg-stone-700"
                            : "bg-stone-200"
                        }`}
                      >
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex items-center mb-3">
                      <ProgressBar progress={task.progress} />
                      <span className="ml-3 text-xs sm:text-sm font-medium w-10">
                        {task.progress}%
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleProgressChange(task.id, -10)}
                          disabled={task.progress <= 0}
                          className={`p-2 rounded-full ${
                            task.progress <= 0
                              ? "opacity-50 cursor-not-allowed"
                              : darkMode
                              ? "bg-stone-500 hover:bg-stone-400"
                              : "bg-stone-200 hover:bg-stone-300"
                          }`}
                        >
                          <FaMinus />
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleProgressChange(task.id, 10)}
                          disabled={task.progress >= 100}
                          className={`p-2 rounded-full ${
                            task.progress >= 100
                              ? "opacity-50 cursor-not-allowed"
                              : darkMode
                              ? "bg-stone-500 hover:bg-stone-400"
                              : "bg-stone-200 hover:bg-stone-300"
                          }`}
                        >
                          <FaPlus />
                        </motion.button>
                      </div>

                      {task.progress === 100 && (
                        <div className="flex items-center text-emerald-500 text-xs sm:text-sm">
                          <FaCheck className="mr-1" />
                          <span>Completed!</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberView;
