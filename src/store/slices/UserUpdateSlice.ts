import { createSlice } from '@reduxjs/toolkit';
import { UserUpdate } from '../../models';

const initialState: UserUpdate = {
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
  skills: [],
  freeInterviews: false,
  freeConsultation: false,
  experience: {
    organization: '',
    years: '',
    position: '',
    verified: null,
  },
  education: { organization: '', years: '', specialization: '', verified: null },
};

const userUpdateSlice = createSlice({
  name: 'userUpdate',
  initialState,
  reducers: {
    setUpdateEducationYears(state, action) {
      if (state.education) state.education.years = action.payload;
    },

    setUpdateEducationOrganization(state, action) {
      if (state.education) state.education.organization = action.payload;
    },
    setUpdateEducationVerified(state, action) {
      if (state.education) state.education.verified = action.payload;
    },

    setUpdateUserName(state, action) {
      state.name = action.payload;
    },
    setUpdateExperienceOrganization(state, action) {
      if (state.experience) state.experience.organization = action.payload;
    },
    setUpdateExperienceYears(state, action) {
      if (state.experience) state.experience.years = action.payload;
    },

    setUpdateExperiencePosition(state, action) {
      if (state.experience) state.experience.position = action.payload;
    },
    setUpdateExperienceVerified(state, action) {
      if (state.experience) state.experience.verified = action.payload;
    },
    setUpdateEducation(state, action) {
      state.education = action.payload;
    },
    setUpdateFreeInterviews(state, action) {
      state.freeInterviews = action.payload;
    },
    setUpdateFreeConsultation(state, action) {
      state.freeConsultation = action.payload;
    },
    setUpdateSkills(state, action) {
      state.skills = action.payload;
    },
    setUpdatePrice(state, action) {
      state.price = action.payload;
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
    setUpdateAbout(state, action) {
      state.about = action.payload;
    },
  },
});

export const {
  setUpdateEducationYears,
  setUpdateEducationVerified,
  setUpdateEducationOrganization,
  setUpdateExperienceVerified,
  setUpdateExperiencePosition,
  setUpdateExperienceYears,
  setUpdateExperienceOrganization,
  setUpdateEducation,
  setUpdateSkills,
  setUpdatePrice,
  setUpdateUserName,
  setUpdateLanguage,
  setUpdateAbout,
  setUpdateRoleStor,
  setUpdateUserLastName,
  setUpdateFreeInterviews,
  setUpdateFreeConsultation,
} = userUpdateSlice.actions;
export default userUpdateSlice.reducer;
