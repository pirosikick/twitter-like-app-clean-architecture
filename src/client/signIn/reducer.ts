import { Reducer } from 'redux';
import { IAction, ActionType } from './types';

export interface IState {
  userNameInput: string;
  passwordInput: string;
  starting: boolean;
  error: 'INVALID_INPUT' | 'SIGNIN_FAILED' | null;
  done: boolean;
}
const initialState: IState = {
  userNameInput: '',
  passwordInput: '',
  starting: false,
  error: null,
  done: false
};

const reducer: Reducer<IState, IAction> = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_USERNAME_INPUT:
      return { ...state, userNameInput: action.payload };

    case ActionType.CHANGE_PASSWORD_INPUT:
      return { ...state, passwordInput: action.payload };

    case ActionType.SIGNIN_STARTING:
      return { ...state, starting: true, error: null };

    case ActionType.INVALID_INPUT:
      return { ...state, starting: false, error: 'INVALID_INPUT' };

    case ActionType.SIGNIN_DONE:
      return { ...state, done: true };

    case ActionType.SIGNIN_FAILED:
      return { ...state, starting: false, error: 'SIGNIN_FAILED' };

    case ActionType.RESET:
      return initialState;
  }
  return state;
};

export default reducer;
