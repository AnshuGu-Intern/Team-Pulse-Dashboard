import { createSlice } from '@reduxjs/toolkit';

const roleSlice = createSlice({
  name: 'role',
  initialState: {
    currentRole: 'member',
    currentUser: 'John Doe',
  },
  reducers: {
    switchRole: (state, action) => {
      state.currentRole = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { switchRole, setCurrentUser } = roleSlice.actions;
export default roleSlice.reducer;