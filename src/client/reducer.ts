import { combineReducers } from 'redux';
import { Action as ReduxFistRouterAction } from 'redux-first-router';
import * as app from './app';
import * as timeline from './timeline';
import * as router from './router';

export type Action = app.Action | timeline.Action | ReduxFistRouterAction;

export interface RootState {
  app: app.State;
  timeline: timeline.State;
  location: ReturnType<typeof router.locationReducer>;
  page: ReturnType<typeof router.pageReducer>;
}

export default combineReducers<RootState>({
  app: app.reducer,
  timeline: timeline.reducer,
  location: router.locationReducer,
  page: router.pageReducer
});
