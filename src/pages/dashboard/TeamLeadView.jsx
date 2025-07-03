import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../store/slices/tasksSlice";
import StatusBadge from "../../components/StatusBadge";
import TaskForm from "../../components/TaskForm";

const TeamLeadView = () => {
  const dispatch = useDispatch();

  const members = useSelector((state) => state.members);
  const tasks = useSelector((state) => state.tasks);
  const darkMode = useSelector((state) => state.ui.darkMode);

  const handleTaskSubmit = (taskData) => {
    dispatch(addTask(taskData));
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6">Team Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {members.map((member) => {
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
