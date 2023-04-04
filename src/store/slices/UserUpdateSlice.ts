import { createSlice } from '@reduxjs/toolkit';
import { User, UserUpdate } from '../../models/interfaces';

const userFromLocalStorage = localStorage.getItem('user');
console.log(userFromLocalStorage);
const initialState: UserUpdate = {
  description: '',
  name: '',
  email: '',
  role: '',
  lastName: '',
};

const userUpdateSlice = createSlice({
  name: 'userUpdate',
  initialState,
  reducers: {
    setUpdateUserName(state, action) {
      state.name = action.payload;
    },
    setUpdateUserLastName(state, action) {
      state.lastName = action.payload;
    },

    setUpdateRoleStor(state, action) {
      state.role = action.payload;
    },
    setUpdateDescription(state, action) {
      state.description = action.payload;
    },
  },
});

export const { setUpdateUserName, setUpdateDescription, setUpdateRoleStor, setUpdateUserLastName } =
  userUpdateSlice.actions;
export default userUpdateSlice.reducer;
