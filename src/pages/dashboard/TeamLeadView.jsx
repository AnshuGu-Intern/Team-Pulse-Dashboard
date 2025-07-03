import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../store/slices/tasksSlice";
import StatusBadge from "../../components/StatusBadge";
import TaskForm from "../../components/TaskForm";
import { FaFilter, FaSort } from "react-icons/fa";
import { setStatusFilter } from "../../store/slices/uiSlice";
import StatusSummary from "../../components/StatusSummary";

const TeamLeadView = () => {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.members);
  const tasks = useSelector((state) => state.tasks);
  const darkMode = useSelector((state) => state.ui.darkMode);
  const statusFilter = useSelector((state) => state.ui.statusFilter);
  const [sortBy, setSortBy] = useState("active");

  const filteredMembers =
    statusFilter === "all"
      ? members
      : members.filter((m) => m.status === statusFilter);

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

  const handleTaskSubmit = (taskData) => {
    dispatch(addTask(taskData));
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
            <h2 className="text-2xl font-bold">Team Overview</h2>
            <div className="flex flex-wrap gap-2">
              <div
                className={`flex items-center px-3 py-2 rounded-lg ${
                  darkMode ? "bg-stone-700" : "bg-stone-200"
                }`}
              >
                <FaFilter className="mr-2" />
                <select
                  value={statusFilter}
                  onChange={(e) => dispatch(setStatusFilter(e.target.value))}
                  className={`bg-transparent ${
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
                  className={`bg-transparent ${
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {sortedMembers.map((member) => {
              const memberTasks = tasks.filter(
                (task) => task.memberId === member.id
              );
              return (
                <div
                  key={member.id}
                  className={`p-6 rounded-xl shadow-lg transition-all ${
                    darkMode
                      ? "bg-stone-700 hover:bg-stone-600"
                      : "bg-white hover:bg-stone-50"
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <StatusBadge status={member.status} />
                  </div>

                  <div className="space-y-3">
                    {memberTasks.length > 0 ? (
                      memberTasks.map((task) => (
                        <div key={task.id}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{task.title}</span>
                            <span>{task.progress}%</span>
                          </div>
                          <div className="w-full bg-stone-200 dark:bg-stone-600 rounded-full h-2">
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
                        </div>
                      ))
                    ) : (
                      <p
                        className={`text-sm ${
                          darkMode ? "text-stone-400" : "text-stone-500"
                        }`}
                      >
                        No tasks assigned
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div
          className={`p-6 rounded-xl shadow-lg sticky top-6 ${
            darkMode ? "bg-stone-700" : "bg-white"
          }`}
        >
          <h2 className="text-xl font-bold mb-4">Assign New Task</h2>
          <TaskForm onSubmit={handleTaskSubmit} />
        </div>
      </div>
    </div>
  );
};

export default TeamLeadView;
