import { isTweetTextValid, Tweet } from '@pirosikick/entities';
import DataAccess from './DataAccess';
import DataAccessError from './DataAccessError';
import InvalidTweetText from './InvalidTweetText';

// ユースケースの入力データ
export interface TweetInput {
  userId: string;
  text: string;
}

// ユースケースの出力データ
export interface TweetOutput {
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

export default class TweetUseCase {
  private dataAccess: DataAccess;

  constructor(dataAccess: DataAccess) {
    this.dataAccess = dataAccess;
  }

  public async tweet(input: TweetInput): Promise<TweetOutput> {
    if (!isTweetTextValid(input.text)) {
      throw new InvalidTweetText();
    }

    try {
      const tweet = await this.dataAccess.createTweet(input.userId, input.text);
      return { tweet };
    } catch (cause) {
      throw new DataAccessError(cause, 'failed to create tweet');
    }
  }
}
