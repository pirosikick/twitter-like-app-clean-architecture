import { signUpWithPassword as usecase } from '@pirosikick/usecases';
import {
  ActionType,
  IChangeUserNameInputAction,
  IChangePasswordInputAction,
  IInvalidInputAction,
  ISignUpStartingAction,
  ISignUpDoneAction,
  ISignUpFailedAction,
  IReset
} from './types';

export const changeUserNameInput = (
  userNameInput: string
): IChangeUserNameInputAction => ({
  type: ActionType.CHANGE_USERNAME_INPUT,
  payload: userNameInput
});

export const changePasswordInput = (
  passwordInput: string
): IChangePasswordInputAction => ({
  type: ActionType.CHANGE_PASSWORD_INPUT,
  payload: passwordInput
});

export const invalidInput = (code: usecase.ErrorCode): IInvalidInputAction => ({
  type: ActionType.INVALID_INPUT,
  payload: code
});

export const signUpStarting = (): ISignUpStartingAction => ({
  type: ActionType.SIGNUP_STARTING
});

export const signUpDone = (
  output: usecase.ISignUpWithPasswordOutput
): ISignUpDoneAction => ({
  type: ActionType.SIGNUP_DONE,
  payload: output
});

export const signUpFailed = (error: Error): ISignUpFailedAction => ({
  type: ActionType.SIGNUP_FAILED,
  payload: error
});

export const reset = (): IReset => ({ type: ActionType.RESET });
