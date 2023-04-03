export const EMAIL_REGEX = /^[\w.%+-]+@[\w.-]+\.[a-zA-Zа-яА-Я]{2,}$/;
export const PASSWORD_REGEX = /^(?=.*[A-Za-zА-Яа-я])(?=.*\d)[A-Za-zА-Яа-я\d\-,.%;№"&*^)(!~]+$/;

export enum Url {
  BASE_URL = 'https://mentor-server-production.up.railway.app',
  PATH_PROFILE = '/profile',
  API_REG = '/signup',
  PATH_API_REGISTER = '/api/auth/local/register',
  PATH_API_LOCAL = '/api/auth/local',
  PATH_API_FORGOT = '/api/auth/forgot-password',
  PATH_API_RESET = '/api/auth/reset-password',
}
