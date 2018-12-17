import { IPayloadAction, IUser } from '../types';

export enum ActionType {
  SET_USER = 'app/app/SET_USER'
}

export type ISetUserAction = IPayloadAction<ActionType.SET_USER, IUser>;

export type IAction = ISetUserAction;
