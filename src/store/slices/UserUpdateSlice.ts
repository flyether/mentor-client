import { createSlice } from '@reduxjs/toolkit';
import { UserUpdate } from '../../models/interfaces';

const userFromLocalStorage = localStorage.getItem('user');
console.log(userFromLocalStorage);
const initialState: UserUpdate = {
  description: '',
  name: '',
  email: '',
  role: '',
  lastName: '',
  language: [],
  cost: {
    value: '',
    currency: '',
  },
  skills: [],
};

const userUpdateSlice = createSlice({
  name: 'userUpdate',
  initialState,
  reducers: {
    setUpdateUserName(state, action) {
      state.name = action.payload;
    },
    setUpdateSkills(state, action) {
      state.skills = action.payload;
    },
    setUpdateCost(state, action) {
      state.cost = action.payload;
    },
    setUpdateLanguage(state, action) {
      state.language = action.payload;
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

export const {
  setUpdateSkills,
  setUpdateCost,
  setUpdateUserName,
  setUpdateLanguage,
  setUpdateDescription,
  setUpdateRoleStor,
  setUpdateUserLastName,
} = userUpdateSlice.actions;
export default userUpdateSlice.reducer;
