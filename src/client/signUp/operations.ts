import { ThunkAction } from 'redux-thunk';
import { signUpWithPassword as usecase } from '@pirosikick/usecases';
import diContainer from '../diContainer';
import { IRootState } from '../reducer';
import { IAction } from './types';
import * as actions from './actions';

export function signUp(
  userName: string,
  password: string
): ThunkAction<Promise<any>, IRootState, {}, IAction> {
  return async dispatch => {
    const signUpWithPassword = diContainer.resolve<usecase.ISignUpWithPassword>(
      'signUpWithPassword'
    );

    dispatch(actions.signUpStarting());

    try {
      const output = await signUpWithPassword({ userName, password });
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
