import { SerializedError } from '@reduxjs/toolkit';

export interface IError extends SerializedError {
  data: {
    message: string;
    stack: string;
  };
  status: number;
}

// export interface IError {
//   data: {
//     message: string;
//     stack: string;
//   };
//   status: number;
// }
export type VerificationToken = {
  verificationToken: string;
};

// export type User = {
//   name: string;
//   email: string;
//   lastName: string;
//   role: string;
//   authorization?: string;
// };
export type SelectLanguage = {
  label: string;
  value: string;
};
// export type Experience = {
//   organization?: string;
//   from?: string;
//   to?: string;
//   position?: string;
//   verified?: FormData | null;
// };
export type Experience = {
  organization?: string;
  years?: string;
  position?: string;
  verified?: FormData | null;
};
export type Education = {
  organization: string;
  years?: string;
  specialization: string;
  verified?: FormData | null;
};
export type User = {
  freeInterviews?: boolean;
  freeConsultation?: boolean;
  id?: string;
  lastSeenOnline?: string;
  name: string;
  email: string;
  lastName: string;
  role: string;
  photo?: string;
  about?: string;
  language?: string[];
  education?: Education;
  experience?: Experience;
  yearsOfExperience?: string;
  currentJob?: {
    organization: string;
    position: string;
  };
  price?: {
    value: string;
    currency: string;
  };
  skills?: string[];
  availability?: string;
};
export type UserUpdate = {
  freeInterviews?: boolean;
  freeConsultation?: boolean;
  id?: string;
  lastSeenOnline?: string;
  name: string;
  email: string;
  lastName: string;
  role: string;
  photo?: string;
  about?: string;
  language?: string[];
  education?: Education;
  experience?: Experience;
  yearsOfExperience?: string;
  currentJob?: {
    organization: string;
    position: string;
  };
  price?: {
    value: string;
    currency: string;
  };
  skills?: string[];
  availability?: string;
};

export type UserResponse = {
  user: User;
};

export interface MentorUpdate {
  id: string;
  body: Mentor;
}
export interface Mentor {
  id?: string | number;
  name?: string;
  email?: string | number | null;
  phone?: string | number;
  description?: string | string[];
  token?: string;
}

export type AuthorizationData = {
  email: string;
  password: string;
  role: string;
};

export type RegData = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
};

export interface MentorUpdate {
  id: string;
  body: Mentor;
}

export interface IToken {
  token: string;
  id: string;
}

export interface Menty {
  id?: string | number;
  name?: string;
  email?: string | number | null;
  phone?: string | number;
  description?: string | string[];
  token?: string;
}
