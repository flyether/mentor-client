import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../models/interfaces';

const initialState: User = {
  authorization: '',
  name: '',
  email: '',
  role: '',
  lastName: '',
};

if (
  localStorage.getItem('authorization') &&
  localStorage.getItem('authorization') === 'authorization'
) {
  initialState.authorization = localStorage.getItem('authorization') as string;
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName(state, action) {
      state.name = action.payload;
    },
    setUserAuthorization(state, action) {
      state.authorization = action.payload;
    },

    setUser(state, action) {
      return { ...action.payload };
    },

    removeUser(state) {
      state.name = '';
      state.lastName = '';
      state.role = '';
      state.email = '';
      state.authorization = '';
    },
  },
});

export const { setUserAuthorization, setUserName, setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
