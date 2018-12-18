import { signInWithPassword as usecase } from '@pirosikick/usecases';
import { IPayloadAction } from '../types';
import { Action } from 'redux';

export enum ActionType {
  CHANGE_USERNAME_INPUT = 'app/signIn/CHANGE_USERNAME_INPUT',
  CHANGE_PASSWORD_INPUT = 'app/signIn/CHANGE_PASSWORD_INPUT',
  INVALID_INPUT = 'app/signIn/INVALID_INPUT',
  SIGNIN_STARTING = 'app/signIn/SIGNIN_STARTING',
  SIGNIN_DONE = 'app/signIn/SIGNIN_DONE',
  SIGNIN_FAILED = 'app/signIn/SINGUP_FAILED',
  RESET = 'app/signIn/RESET'
}

export type IChangeUserNameInput = IPayloadAction<
  ActionType.CHANGE_USERNAME_INPUT,
  string
>;

export type IChangePasswordInput = IPayloadAction<
  ActionType.CHANGE_PASSWORD_INPUT,
  string
>;

export type ISignInStartingAction = Action<ActionType.SIGNIN_STARTING>;

export type IInvalidInputAction = Action<ActionType.INVALID_INPUT>;

export type ISignInDoneAction = IPayloadAction<
  ActionType.SIGNIN_DONE,
  usecase.ISignInWithPasswordOutput
>;

export type ISignInFailedAction = IPayloadAction<
  ActionType.SIGNIN_FAILED,
  Error
>;

export type IReset = Action<ActionType.RESET>;

export type IAction =
  | IChangeUserNameInput
  | IChangePasswordInput
  | IInvalidInputAction
  | ISignInStartingAction
  | ISignInDoneAction
  | ISignInFailedAction
  | IReset;
