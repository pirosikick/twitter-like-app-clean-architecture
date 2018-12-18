import { signInWithPassword as usecase } from '@pirosikick/usecases';
import {
  ActionType,
  IChangeUserNameInput,
  IChangePasswordInput,
  ISignInStartingAction,
  IInvalidInputAction,
  ISignInDoneAction,
  ISignInFailedAction,
  IReset
} from './types';

export const changeUserNameInput = (
  userNameInput: string
): IChangeUserNameInput => ({
  type: ActionType.CHANGE_USERNAME_INPUT,
  payload: userNameInput
});

export const changePasswordInput = (
  passwordInput: string
): IChangePasswordInput => ({
  type: ActionType.CHANGE_PASSWORD_INPUT,
  payload: passwordInput
});

export const signInStating = (): ISignInStartingAction => ({
  type: ActionType.SIGNIN_STARTING
});

export const invalidInput = (): IInvalidInputAction => ({
  type: ActionType.INVALID_INPUT
});

export const signInDone = (
  output: usecase.ISignInWithPasswordOutput
): ISignInDoneAction => ({
  type: ActionType.SIGNIN_DONE,
  payload: output
});

export const signInFailed = (error: Error): ISignInFailedAction => ({
  type: ActionType.SIGNIN_FAILED,
  payload: error
});

export const reset = (): IReset => ({
  type: ActionType.RESET
});
