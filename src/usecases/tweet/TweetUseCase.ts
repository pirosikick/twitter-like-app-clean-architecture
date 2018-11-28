// usecases/tweet/UseCase.ts
import { isTweetTextValid, Tweet } from 'entities';
import DataAccess from './DataAccess';
import DataAccessError from './DataAccessError';
import InvalidTweetText from './InvalidTweetText';

interface TweetOutput {
  tweet: {
    id: string;
    userId: string;
    text: string;
    createdAt: Date;
  };
}

export default class TweetUseCase {
  private dataAccess: DataAccess;

  constructor(dataAccess: DataAccess) {
    this.dataAccess = dataAccess;
  }

  public async tweet(userId: string, text: string): Promise<TweetOutput> {
    if (!isTweetTextValid(text)) {
      throw new InvalidTweetText();
    }

    try {
      const tweet = await this.dataAccess.createTweet(userId, text);
      return { tweet };
    } catch (cause) {
      throw new DataAccessError(cause, 'failed to create tweet');
    }
  }
}
