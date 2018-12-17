import { IUser } from '../types';
import { ActionType, ISetUserAction } from './types';

export const setUser = (user: IUser): ISetUserAction => ({
  type: ActionType.SET_USER,
  payload: user
});
