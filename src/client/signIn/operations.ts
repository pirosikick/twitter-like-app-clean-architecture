import { IThunkAction } from '../types';
import { IAction } from './types';
import { actions as appActions, IAction as IAppAction } from '../app';
import * as actions from './actions';

export function signIn(
  userName: string,
  password: string
): IThunkAction<Promise<any>, IAction | IAppAction> {
  return async (dispatch, getState, { usecases }) => {
    dispatch(actions.signInStating());
    try {
      const output = await usecases.signInWithPassword({ userName, password });
      if (output.succeeded) {
        dispatch(appActions.setUser(output.user));
        dispatch(actions.signInDone(output));
      } else {
        dispatch(actions.invalidInput());
      }
    } catch (error) {
      dispatch(actions.signInFailed(error));
    }
  };
}
