// usecases/tweet/UseCase.ts
import { isTweetTextValid, Tweet } from 'entities';
import TweetDataAccess from './TweetDataAccess';
import TweetDataAccessError from './TweetDataAccessError';
import InvalidTweetText from './InvalidTweetText';

interface TweetOutput {
  tweet: {
    id: string;
    user: {
      id: string;
      name: string;
      fullName: string;
      bio: string;
      createdAt: Date;
    };
    text: string;
    createdAt: Date;
  };
}

export default class TweetUseCase {
  private dataAccess: TweetDataAccess;

  constructor(dataAccess: TweetDataAccess) {
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
      throw new TweetDataAccessError(cause, 'failed to create tweet');
    }
  }
}
