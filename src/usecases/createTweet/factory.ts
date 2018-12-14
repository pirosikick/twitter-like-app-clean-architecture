import { isTweetTextValid } from '@pirosikick/entities';
import { ICreateTweetFactory } from './interface';
import InvalidTweetText from './InvalidTweetText';
import DataAccessError from './DataAccessError';

const createTweetFactory: ICreateTweetFactory = dataAccess => {
  return async function createTweet(input) {
    if (!isTweetTextValid(input.text)) {
      throw new InvalidTweetText();
    }

    try {
      const tweet = await dataAccess.createTweet(input.userId, input.text);
      return { tweet };
    } catch (cause) {
      throw new DataAccessError(cause, 'failed to create tweet');
    }
  };
};

export default createTweetFactory;
