import { createAction } from 'typesafe-actions';
import * as usecases from '@pirosikick/usecases';
import ActionType from './ActionType';

export const tweet = createAction(
  ActionType.TWEET,
  resolve => (input: usecases.tweet.Input, callerId: string = '') =>
    resolve({ input, callerId })
);

export const finishedTweeting = createAction(
  ActionType.FINISHED_TWEETING,
  resolve => (output: usecases.tweet.Output, callerId: string) =>
    resolve({ output, callerId })
);

export const failedToTweet = createAction(
  ActionType.FAILED_TO_TWEET,
  resolve => (error: Error, callerId: string) => resolve({ error, callerId })
);

export const retweet = createAction(
  ActionType.RETWEET,
  resolve => (input: usecases.retweet.Input, callerId: string = '') =>
    resolve({ input, callerId })
);

export const finishedRetweeting = createAction(
  ActionType.FINISHED_RETWEETING,
  resolve => (output: usecases.retweet.Output, callerId: string) =>
    resolve({ output, callerId })
);

export const failedToRetweet = createAction(
  ActionType.FAILED_TO_RETWEET,
  resolve => (error: Error, callerId: string) => resolve({ error, callerId })
);

export const createUser = createAction(
  ActionType.CREATE_USER,
  resolve => (input: usecases.createUser.Input, callerId: string = '') =>
    resolve({ input, callerId })
);

export const finishedCreatingUser = createAction(
  ActionType.FINISHED_CREATING_USER,
  resolve => (output: usecases.createUser.Output, callerId: string) =>
    resolve({ output, callerId })
);

export const failedToCreateUser = createAction(
  ActionType.FAILED_TO_CREATE_USER,
  resolve => (error: Error, callerId: string) => resolve({ error, callerId })
);

export const readTimeline = createAction(
  ActionType.READ_TIMELINE,
  resolve => (input: usecases.readTimeline.Input, callerId: string = '') =>
    resolve({ input, callerId })
);

export const finishedReadingTimeline = createAction(
  ActionType.FINISHED_READING_TIMELINE,
  resolve => (output: usecases.readTimeline.Output, callerId: string) =>
    resolve({ output, callerId })
);

export const failedToReadTimeline = createAction(
  ActionType.FAILED_TO_READ_TIMELINE,
  resolve => (error: Error, callerId: string) => resolve({ error, callerId })
);
