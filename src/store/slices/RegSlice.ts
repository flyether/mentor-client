import { createSlice } from '@reduxjs/toolkit';
import { RegData } from '../../models/interfaces';

const initialState: RegData = {
  password: '',
  name: '',
  email: '',
  role: '',
  lastName: '',
};

const regSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setRegEmail(state, action) {
      state.email = action.payload;
    },
    setRegPassword(state, action) {
      state.password = action.payload;
    },
    setRegRole(state, action) {
      state.role = action.payload;
    },
  },
});

export const { setRegEmail, setRegPassword, setRegRole } = regSlice.actions;
export default regSlice.reducer;
