import { ICreateRetweetFactory } from './interface';
import DataAccessError from './DataAccessError';

const createRetweetFactory: ICreateRetweetFactory = dataAccess => {
  return async function createRetweet(input) {
    try {
      const retweet = await dataAccess.createRetweet(
        input.userId,
        input.tweetId
      );
      return { retweet };
    } catch (cause) {
      throw new DataAccessError(cause, 'failed to create retweet');
    }
  };
};

export default createRetweetFactory;
