import * as actions from './actions';
import { IThunkAction } from '../types';
import { IAction } from './types';

export function signUp(
  userName: string,
  password: string
): IThunkAction<Promise<any>, IAction> {
  return async (dispatch, getState, { usecases }) => {
    dispatch(actions.signUpStarting());

    try {
      const output = await usecases.signUpWithPassword({ userName, password });
      if (output.succeeded) {
        dispatch(actions.signUpDone(output));
      } else {
        dispatch(actions.invalidInput(output.code));
      }
    } catch (error) {
      dispatch(actions.signUpFailed(error));
    }
  };
}
