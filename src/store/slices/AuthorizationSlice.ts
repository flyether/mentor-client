import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authorization: '',
};

if (localStorage.getItem('authorization')) {
  initialState.authorization = localStorage.getItem('authorization') as string;
}

const authorizationSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserAuthorization(state, action) {
      state.authorization = action.payload;
    },
    removeAuthorization(state) {
      state.authorization = '';
    },
  },
});

export const { setUserAuthorization, removeAuthorization } = authorizationSlice.actions;
export default authorizationSlice.reducer;
