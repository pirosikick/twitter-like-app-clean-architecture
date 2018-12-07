import { createAction } from 'typesafe-actions';
import ActionType from './ActionType';

export const changeInputTweetText = createAction(
  ActionType.CHANGE_INPUT_TWEET_TEXT,
  resolve => (inputTweetText: string) => resolve(inputTweetText)
);
