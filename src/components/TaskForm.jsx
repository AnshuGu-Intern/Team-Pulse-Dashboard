import React, { useState } from "react";
import { useSelector } from "react-redux";

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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          className={`block text-sm font-medium mb-1 ${
            darkMode ? "text-stone-300" : "text-stone-700"
          }`}
        >
          Assign to:
        </label>
        <select
          name="memberId"
          value={taskData.memberId}
          onChange={handleChange}
          className={`w-full p-2 rounded-lg ${
            darkMode
              ? "bg-stone-600 text-stone-100"
              : "bg-stone-100 text-stone-900"
          }`}
          required
        >
          <option value="">Select team member</option>
          {members.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </select>
      </div>

      <div>
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
          className={`w-full p-2 rounded-lg ${
            darkMode
              ? "bg-stone-600 text-stone-100"
              : "bg-stone-100 text-stone-900"
          }`}
          required
        />
      </div>

      <div>
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
          className={`w-full p-2 rounded-lg ${
            darkMode
              ? "bg-stone-600 text-stone-100"
              : "bg-stone-100 text-stone-900"
          }`}
          required
        />
      </div>

      <button
        type="submit"
        className={`w-full py-2 rounded-lg font-medium ${
          darkMode
            ? "bg-amber-500 text-stone-900 hover:bg-amber-400"
            : "bg-stone-800 text-white hover:bg-stone-700"
        }`}
      >
        Assign Task
      </button>
    </form>
  );
};

export default TaskForm;
