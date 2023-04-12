import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authorization: '',
  role: '',
};

if (localStorage.getItem('authorization')) {
  initialState.authorization = localStorage.getItem('authorization') as string;
}
if (localStorage.getItem('role')) {
  initialState.role = localStorage.getItem('role') as string;
}

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setUserAuthorization(state, action) {
      state.authorization = action.payload;
    },
    setAuthorizationRole(state, action) {
      state.role = action.payload;
    },
    removeAuthorization(state) {
      state.authorization = '';
      state.role = '';
    },
  },
});

export const { setUserAuthorization, setAuthorizationRole, removeAuthorization } =
  authorizationSlice.actions;
export default authorizationSlice.reducer;
