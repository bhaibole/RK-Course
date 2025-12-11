import { User, UserRole } from '../types';
import { MOCK_USER } from '../constants';

export const login = async (email: string, password: string): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_USER);
    }, 800);
  });
};

export const signup = async (email: string, password: string): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...MOCK_USER, email, id: 'new_user' });
    }, 800);
  });
};

export const logout = async (): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, 500));
};