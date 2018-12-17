import { combineReducers } from 'redux';
import * as app from './app';
import * as signUp from './signUp';

export type IAction = app.types.IAction | signUp.types.IAction;

export interface IRootState {
  app: app.IState;
  signUp: signUp.IState;
}

export default combineReducers<IRootState>({
  app: app.reducer,
  signUp: signUp.reducer
});
