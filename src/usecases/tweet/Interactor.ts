import { isTweetTextValid, Tweet } from 'entities';
import DataAccess from './DataAccess';
import DataAccessError from './DataAccessError';
import InvalidTweetText from './InvalidTweetText';

// ユースケースの入力データ
interface InteractorInput {
  userId: string;
  text: string;
}

// ユースケースの出力データ
interface InteractorOutput {
  tweet: {
    id: string;
    user: {
      id: string;
      name: string;
      createdAt: Date;
    };
    text: string;
    createdAt: Date;
  };
}

export default class TweetInteractor {
  private dataAccess: DataAccess;

  constructor(dataAccess: DataAccess) {
    this.dataAccess = dataAccess;
  }

  public async tweet(userId: string, text: string): Promise<InteractorOutput> {
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
