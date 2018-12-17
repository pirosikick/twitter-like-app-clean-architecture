import { signUpWithPassword as usecase } from '@pirosikick/usecases';
import { IPayloadAction } from '../types';
import { Action } from 'redux';

export enum ActionType {
  CHANGE_USERNAME_INPUT = 'app/signUp/CHANGE_USERNAME_INPUT',
  CHANGE_PASSWORD_INPUT = 'app/signUp/CHANGE_PASSWORD_INPUT',
  INVALID_INPUT = 'app/signUp/INVALID_INPUT',
  SIGNUP_STARTING = 'app/signUp/SIGNUP_STARTING',
  SIGNUP_DONE = 'app/signUp/SIGNUP_DONE',
  SIGNUP_FAILED = 'app/signUp/SINGUP_FAILED',
  RESET = 'app/signUp/RESET'
}

export type IChangeUserNameInputAction = IPayloadAction<
  ActionType.CHANGE_USERNAME_INPUT,
  string
>;

export type IChangePasswordInputAction = IPayloadAction<
  ActionType.CHANGE_PASSWORD_INPUT,
  string
>;

export type IInvalidInputAction = IPayloadAction<
  ActionType.INVALID_INPUT,
  usecase.ErrorCode
>;

export type ISignUpStartingAction = Action<ActionType.SIGNUP_STARTING>;

export type ISignUpDoneAction = IPayloadAction<
  ActionType.SIGNUP_DONE,
  usecase.ISignUpWithPasswordOutput
>;

export type ISignUpFailedAction = IPayloadAction<
  ActionType.SIGNUP_FAILED,
  Error
>;

export type IReset = Action<ActionType.RESET>;

export type IAction =
  | IChangeUserNameInputAction
  | IChangePasswordInputAction
  | IInvalidInputAction
  | ISignUpStartingAction
  | ISignUpDoneAction
  | ISignUpFailedAction
  | IReset;
