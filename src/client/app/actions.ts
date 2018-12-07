import { createAction } from 'typesafe-actions';
import ActionType from './ActionType';
import { User } from '../types';

export const setUser = createAction(
  ActionType.SET_USER,
  resolve => (user: User) => resolve(user)
);
