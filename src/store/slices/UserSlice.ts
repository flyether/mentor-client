import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../models/interfaces';

const userFromLocalStorage = localStorage.getItem('user');
console.log(userFromLocalStorage);
const initialState: User = userFromLocalStorage
  ? JSON.parse(userFromLocalStorage)
  : {
      name: '',
      email: '',
      role: '',
      lastName: '',
    };

if (localStorage.getItem('authorization')) {
  initialState.authorization = localStorage.getItem('authorization') as string;
}
if (localStorage.getItem('role')) {
  initialState.role = localStorage.getItem('role') as string;
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName(state, action) {
      state.name = action.payload;
    },
    setUserLastName(state, action) {
      state.lastName = action.payload;
    },
    setRoleStor(state, action) {
      state.role = action.payload;
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

export const { setUserName, setUser, removeUser, setRoleStor, setUserLastName } = userSlice.actions;
export default userSlice.reducer;
