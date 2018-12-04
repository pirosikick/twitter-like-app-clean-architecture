import { Store, Middleware } from 'redux';
import { getType, ActionType } from 'typesafe-actions';
import * as usecases from 'usecases';
import * as actions from './actions';

export type Action = ActionType<typeof actions>;

export default function createMiddleware(
  tweetUseCase: usecases.tweet.UseCase,
  retweetUseCase: usecases.retweet.UseCase,
  readTimelineUseCase: usecases.readTimeline.UseCase,
  createUserUseCase: usecases.createUser.UseCase
): Middleware {
  return store => next => async (action: Action) => {
    switch (action.type) {
      case getType(actions.tweet):
        try {
          const output = await tweetUseCase.tweet(action.payload.input);
          store.dispatch(
            actions.finishedTweeting(output, action.payload.callerId)
          );
        } catch (error) {
          store.dispatch(actions.failedToTweet(error, action.payload.callerId));
        }
        return;

      case getType(actions.retweet):
        try {
          const output = await retweetUseCase.retweet(action.payload.input);
          store.dispatch(
            actions.finishedRetweeting(output, action.payload.callerId)
          );
        } catch (error) {
          store.dispatch(
            actions.failedToRetweet(error, action.payload.callerId)
          );
        }
        return;
      case getType(actions.readTimeline):
        try {
          const output = await readTimelineUseCase.readTimeline(
            action.payload.input
          );
          store.dispatch(
            actions.finishedReadingTimeline(output, action.payload.callerId)
          );
        } catch (error) {
          store.dispatch(
            actions.failedToReadTimeline(error, action.payload.callerId)
          );
        }
        return;

      case getType(actions.createUser):
        try {
          const output = await createUserUseCase.createUser(
            action.payload.input
          );
          store.dispatch(
            actions.finishedCreatingUser(output, action.payload.callerId)
          );
        } catch (error) {
          store.dispatch(
            actions.failedToCreateUser(error, action.payload.callerId)
          );
        }
        return;

      default:
        next(action);
    }
  };
}
