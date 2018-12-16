import { combineReducers } from 'redux';
import * as app from './app';

export type Action = app.Action;

export interface IRootState {
  app: app.State;
}

export default combineReducers<IRootState>({
  app: app.reducer
});
