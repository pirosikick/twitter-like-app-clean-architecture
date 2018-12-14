import { IGetTweetsFactory } from './interface';
import DataAccessError from './DataAccessError';

const getTweetsFactory: IGetTweetsFactory = dataAccess => {
  return async function getTweets(input) {
    try {
      const tweets = await dataAccess.findTweetsByUserName(input.userName);
      return { tweets };
    } catch (cause) {
      throw new DataAccessError(cause, 'failed to find tweets by user name');
    }
  };
};

export default getTweetsFactory;
