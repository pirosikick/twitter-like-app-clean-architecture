import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { actions } from '@pirosikick/redux-middleware';
import { RootState } from '../reducer';

export const CALLER_ID = 'timeline';

export const tweet = (userId: string, tweetText: string) =>
  actions.tweet({ userId, text: tweetText }, CALLER_ID);
