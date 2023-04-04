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

export type User = {
  name: string;
  email: string;
  lastName: string;
  role: string;
  authorization?: string;
};

export type UserUpdate = {
  name: string;
  email: string;
  lastName: string;
  role?: string;
  description?: string;
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

export type InitialValues = {
  name: string;
  lastName: string;
};
