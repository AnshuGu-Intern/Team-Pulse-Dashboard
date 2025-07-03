import { createSlice } from "@reduxjs/toolkit";

const getInitialMembers = () => [
  {
    id: 1,
    name: "John Doe",
    status: "working",
    lastActive: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Jane Smith",
    status: "break",
    lastActive: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Bob Johnson",
    status: "meeting",
    lastActive: new Date().toISOString(),
  },
  {
    id: 4,
    name: "Alice Williams",
    status: "offline",
    lastActive: new Date(Date.now() - 15 * 60000).toISOString(),
  },
];

const membersSlice = createSlice({
  name: "members",
  initialState: getInitialMembers(),
  reducers: {
    updateStatus: (state, action) => {
      const { id, status } = action.payload;
      const member = state.find((m) => m.id === id);
      if (member) {
        member.status = status;
        member.lastActive = new Date().toISOString();
      }
    },
    resetInactive: (state, action) => {
      const threshold = new Date(Date.now() - 10 * 60000);
      state.forEach((member) => {
        if (
          new Date(member.lastActive) < threshold &&
          member.status !== "offline"
        ) {
          member.status = "offline";
        }
      });
    },
  },
});

export const { updateStatus, resetInactive } = membersSlice.actions;
export default membersSlice.reducer;
