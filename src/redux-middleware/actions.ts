import { action } from 'typesafe-actions';
import * as usecases from '@pirosikick/usecases';
import { ActionTypes } from './types';

export const tweet = (input: usecases.tweet.Input, callerId: string = '') =>
  action(ActionTypes.TWEET, { input, callerId });

export const finishedTweeting = (
  output: usecases.tweet.Output,
  callerId: string
) => action(ActionTypes.FINISHED_TWEETING, { output, callerId });

export const failedToTweet = (error: Error, callerId: string) =>
  action(ActionTypes.FAILED_TO_TWEET, { error, callerId });

export const retweet = (input: usecases.retweet.Input, callerId: string = '') =>
  action(ActionTypes.RETWEET, { input, callerId });

export const finishedRetweeting = (
  output: usecases.retweet.Output,
  callerId: string
) => action(ActionTypes.FINISHED_RETWEETING, { output, callerId });

export const failedToRetweet = (error: Error, callerId: string) =>
  action(ActionTypes.FAILED_TO_RETWEET, { error, callerId });

export const createUser = (
  input: usecases.createUser.Input,
  callerId: string = ''
) => action(ActionTypes.CREATE_USER, { input, callerId });

export const finishedCreatingUser = (
  output: usecases.createUser.Output,
  callerId: string
) => action(ActionTypes.FINISHED_CREATING_USER, { output, callerId });

export const failedToCreateUser = (error: Error, callerId: string) =>
  action(ActionTypes.FAILED_TO_CREATE_USER, { error, callerId });

export const readTimeline = (
  input: usecases.readTimeline.Input,
  callerId: string = ''
) => action(ActionTypes.READ_TIMELINE, { input, callerId });

export const finishedReadingTimeline = (
  output: usecases.readTimeline.Output,
  callerId: string
) => action(ActionTypes.FINISHED_READING_TIMELINE, { output, callerId });

export const failedToReadTimeline = (error: Error, callerId: string) =>
  action(ActionTypes.FAILED_TO_READ_TIMELINE, { error, callerId });
