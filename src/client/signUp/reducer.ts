import { Reducer } from 'redux';
import { ActionType, IAction } from './types';
import { signUpWithPassword as usecase } from '@pirosikick/usecases';

export interface IState {
  userNameInput: string;
  passwordInput: string;
  starting: boolean;
  done: boolean;
  errorCode: usecase.ErrorCode | null;
}
const initialState: IState = {
  userNameInput: '',
  passwordInput: '',
  starting: false,
  done: false,
  errorCode: null
};

const reducer: Reducer<IState, IAction> = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_USERNAME_INPUT:
      return { ...state, userNameInput: action.payload };

    case ActionType.CHANGE_PASSWORD_INPUT:
      return { ...state, passwordInput: action.payload };

    case ActionType.SIGNUP_STARTING:
      return { ...state, starting: true };

    case ActionType.INVALID_INPUT:
      return { ...state, starting: false, errorCode: action.payload };

    case ActionType.SIGNUP_DONE:
      return { ...state, starting: false, done: true };

    case ActionType.SIGNUP_FAILED:
      return { ...state, starting: false };

    case ActionType.RESET:
      return initialState;

    default:
      return state;
  }
};

export default reducer;
