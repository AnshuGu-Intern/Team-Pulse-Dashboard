import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStatusFilter } from "../../store/slices/uiSlice";
import { addTask } from "../../store/slices/tasksSlice";
import StatusBadge from "../../components/StatusBadge";
import ProgressBar from "../../components/ProgressBar";
import TaskForm from "../../components/TaskForm";
import StatusSummary from "../../components/StatusSummary";
import { FaFilter, FaSort } from "react-icons/fa";

const TeamLeadView = () => {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.members);
  const tasks = useSelector((state) => state.tasks);
  const statusFilter = useSelector((state) => state.ui.statusFilter);
  const darkMode = useSelector((state) => state.ui.darkMode);

  const [sortBy, setSortBy] = useState("active");

  // Filter members by status
  const filteredMembers =
    statusFilter === "all"
      ? members
      : members.filter((m) => m.status === statusFilter);

  // Sort members
  const sortedMembers = [...filteredMembers].sort((a, b) => {
    if (sortBy === "active") {
      const aTasks = tasks.filter(
        (t) => t.memberId === a.id && t.progress < 100
      ).length;
      const bTasks = tasks.filter(
        (t) => t.memberId === b.id && t.progress < 100
      ).length;
      return bTasks - aTasks;
    } else {
      return a.name.localeCompare(b.name);
    }
  });

  // Handle task assignment
  const handleTaskSubmit = (taskData) => {
    dispatch(
      addTask({
        ...taskData,
        id: Date.now(),
        progress: 0,
      })
    );
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-stone-800 text-stone-100" : "bg-stone-50 text-stone-900"
      }`}
    >
      <div className="container mx-auto px-3 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Team Overview */}
          <div className="lg:w-2/3">
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
                <h2 className="text-xl sm:text-2xl font-bold">Team Overview</h2>
                <div className="flex flex-wrap gap-2">
                  <div
                    className={`flex items-center px-3 py-2 rounded-lg ${
                      darkMode ? "bg-stone-700" : "bg-stone-200"
                    }`}
                  >
                    <FaFilter className="mr-2" />
                    <select
                      value={statusFilter}
                      onChange={(e) =>
                        dispatch(setStatusFilter(e.target.value))
                      }
                      className={`bg-transparent focus:outline-none ${
                        darkMode ? "text-stone-100" : "text-stone-900"
                      }`}
                    >
                      <option value="all">All Statuses</option>
                      <option value="working">Working</option>
                      <option value="break">Break</option>
                      <option value="meeting">Meeting</option>
                      <option value="offline">Offline</option>
                    </select>
                  </div>

                  <div
                    className={`flex items-center px-3 py-2 rounded-lg ${
                      darkMode ? "bg-stone-700" : "bg-stone-200"
                    }`}
                  >
                    <FaSort className="mr-2" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className={`bg-transparent focus:outline-none ${
                        darkMode ? "text-stone-100" : "text-stone-900"
                      }`}
                    >
                      <option value="active">Active Tasks</option>
                      <option value="name">Name</option>
                    </select>
                  </div>
                </div>
              </div>

              <StatusSummary />
            </div>

            {/* Responsive grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sortedMembers.map((member) => (
                <div
                  key={member.id}
                  className={`p-4 rounded-xl shadow-lg transition-all duration-300 ${
                    darkMode
                      ? "bg-stone-700 hover:bg-stone-600"
                      : "bg-white hover:bg-stone-100"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold">
                        {member.name}
                      </h3>
                      <div className="mt-2">
                        <StatusBadge status={member.status} />
                      </div>
                    </div>
                    <div
                      className={`text-xs sm:text-sm ${
                        darkMode ? "text-stone-400" : "text-stone-500"
                      }`}
                    >
                      Last active:{" "}
                      {new Date(member.lastActive).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Tasks:</h4>
                    {tasks.filter((t) => t.memberId === member.id).length >
                    0 ? (
                      tasks
                        .filter((t) => t.memberId === member.id)
                        .map((task) => (
                          <div key={task.id} className="mb-3">
                            <div className="flex justify-between text-xs sm:text-sm mb-1">
                              <span>{task.title}</span>
                              <span>{task.progress}%</span>
                            </div>
                            <ProgressBar progress={task.progress} />
                          </div>
                        ))
                    ) : (
                      <p
                        className={`text-xs sm:text-sm ${
                          darkMode ? "text-stone-400" : "text-stone-500"
                        }`}
                      >
                        No tasks assigned
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Task Assignment */}
          <div className="lg:w-1/3">
            <div
              className={`sticky top-4 p-4 rounded-xl shadow-lg ${
                darkMode ? "bg-stone-700" : "bg-white"
              }`}
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-4">
                Task Assignment
              </h2>
              <TaskForm onSubmit={handleTaskSubmit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamLeadView;
