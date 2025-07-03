import React, { useState } from "react";
import { useSelector } from "react-redux";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const TaskForm = ({ onSubmit }) => {
  const [taskData, setTaskData] = useState({
    memberId: "",
    title: "",
    dueDate: "",
  });

  const members = useSelector((state) => state.members);
  const darkMode = useSelector((state) => state.ui.darkMode);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskData.memberId && taskData.title && taskData.dueDate) {
      onSubmit({
        ...taskData,
        memberId: Number(taskData.memberId),
      });
      setTaskData({
        memberId: "",
        title: "",
        dueDate: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label
          className={`block text-sm font-medium mb-1 ${
            darkMode ? "text-stone-300" : "text-stone-700"
          }`}
        >
          Assign to:
        </label>
        <div
          className={`relative ${
            darkMode ? "bg-stone-600" : "bg-stone-100"
          } rounded-lg`}
        >
          <select
            name="memberId"
            value={taskData.memberId}
            onChange={handleChange}
            className={`w-full rounded-xl  p-2 bg-transparent focus:outline-none appearance-none ${
              darkMode ? "text-stone-100" : "text-stone-900"
            }`}
            required
          >
            <option value="">Select a team member</option>
            {members.map((member) => (
              <option
                key={member.id}
                value={member.id}
                className={darkMode ? "bg-stone-700" : "bg-stone-100"}
              >
                {member.name}
              </option>
            ))}
          </select>
          <div
            className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 ${
              darkMode ? "text-stone-300" : "text-stone-500"
            }`}
          >
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <label
          className={`block text-sm font-medium mb-1 ${
            darkMode ? "text-stone-300" : "text-stone-700"
          }`}
        >
          Task Title:
        </label>
        <input
          type="text"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          className={`w-full p-2 rounded-lg focus:ring focus:outline-none ${
            darkMode
              ? "bg-stone-600 text-stone-100"
              : "bg-stone-100 text-stone-900"
          }`}
          placeholder="Enter task description"
          required
        />
      </div>

      <div className="mb-4">
        <label
          className={`block text-sm font-medium mb-1 ${
            darkMode ? "text-stone-300" : "text-stone-700"
          }`}
        >
          Due Date:
        </label>
        <input
          type="date"
          name="dueDate"
          value={taskData.dueDate}
          onChange={handleChange}
          className={`w-full p-2 rounded-lg focus:ring focus:outline-none ${
            darkMode
              ? "bg-stone-600 text-stone-100"
              : "bg-stone-100 text-stone-900"
          }`}
          required
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className={`w-full py-2 sm:py-3 rounded-lg font-semibold transition-colors duration-300 ${
          darkMode
            ? "bg-amber-500 text-stone-900 hover:bg-amber-400"
            : "bg-stone-800 text-stone-100 hover:bg-stone-700"
        }`}
      >
        Assign Task
      </motion.button>
    </form>
  );
};

export default TaskForm;
