import { createSlice } from "@reduxjs/toolkit";

const getInitialTasks = () => [
  {
    id: 1,
    memberId: 1,
    title: "Fix navigation bug",
    progress: 30,
    dueDate: "2023-12-01",
  },
  {
    id: 2,
    memberId: 1,
    title: "Update documentation",
    progress: 60,
    dueDate: "2023-12-05",
  },
  {
    id: 3,
    memberId: 2,
    title: "Design new dashboard",
    progress: 80,
    dueDate: "2023-12-03",
  },
  {
    id: 4,
    memberId: 3,
    title: "API integration",
    progress: 45,
    dueDate: "2023-12-07",
  },
];

const taskSlice = createSlice({
  name: "tasks",
  initialState: getInitialTasks(),
  reducers: {
    addTask: (state, action) => {
      state.push({
        ...action.payload,
        id: Date.now(),
        progress: 0,
      });
    },
    updateProgress: (state, action) => {
      const { id, amount } = action.payload;
      const taskIndex = state.findIndex((t) => t.id === id);
      if (taskIndex !== -1) {
        state[taskIndex].progress = Math.min(
          100,
          Math.max(0, state[taskIndex].progress + amount)
        );
      }
    },
  },
});

export const { addTask, updateProgress } = taskSlice.actions;
export default taskSlice.reducer;
