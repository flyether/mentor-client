import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../models/interfaces';

const initialState: User = {
  about: '',
  name: '',
  email: '',
  role: '',
  lastName: '',
  language: [],
  price: {
    value: '',
    currency: '',
  },
  skills: ['лошадь', 'кушать'],
  freeInterviews: false,
  freeConsultation: false,
  experience: {
    organization: 'ЦРУ',
    // from: '2018',
    // to: '2023',
    years: '3',
    position: 'Специальный агент',
    verified: null,
  },
  education: {
    organization: 'цирк',
    years: '2020',
    specialization: 'клоун',
    verified: null,
  },
};

if (localStorage.getItem('user')) {
  const mentorFromLocalStorage = localStorage.getItem('user');
  const sta = mentorFromLocalStorage ? JSON.parse(mentorFromLocalStorage) : null;
  initialState.name = sta.name;
  initialState.lastName = sta.lastName;
  initialState.email = sta.email;
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
      state.about = '';
      state.skills = [];
      state.price = {
        value: '',
        currency: '',
      };
      state.language = [];
      state.freeInterviews = false;
      state.freeConsultation = false;
      state.experience = {
        organization: '',
        years: '',
        position: '',
        verified: null,
      };
      state.education = { organization: '', years: '', specialization: '', verified: null };
    },
  },
});

export const { setUserName, setUser, removeUser, setRoleStor, setUserLastName } = userSlice.actions;
export default userSlice.reducer;
