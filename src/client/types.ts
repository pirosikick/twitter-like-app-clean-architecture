import { Store, Action, Reducer } from 'redux';
import { ThunkAction } from 'redux-thunk';
import * as usecases from '@pirosikick/usecases';
import * as app from './app';
import * as signUp from './signUp';
import * as signIn from './signIn';

export interface IUser {
  readonly id: string;
  readonly name: string;
}

export type IAction = app.IAction | signUp.IAction | signIn.IAction;

export interface IRootState {
  app: app.IState;
  signUp: signUp.IState;
  signIn: signIn.IState;
}

export type IStore = Store<IRootState, IAction>;

export interface IPayloadAction<T, P> extends Action {
  type: T;
  payload: P;
}

export interface IThunkExtraArgument {
  usecases: {
    signUpWithPassword: usecases.signUpWithPassword.ISignUpWithPassword;
    signInWithPassword: usecases.signInWithPassword.ISignInWithPassword;
    getTweets: usecases.getTweets.IGetTweets;
    createTweet: usecases.createTweet.ICreateTweet;
  };
}

export type IThunkAction<R, A extends Action<any>> = ThunkAction<
  R,
  IRootState,
  IThunkExtraArgument,
  A
>;
