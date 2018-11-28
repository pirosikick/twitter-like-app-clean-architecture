import RetweetDataAccess from './RetweetDataAccess';
import RetweetDataAccessError from './RetweetDataAccessError';

interface RetweetOutput {
  retweet: {
    id: string;
    userId: string;
    tweet: {
      id: string;
      userId: string;
      text: string;
      createdAt: Date;
    };
    createdAt: Date;
  };
}

export default class RetweetUseCase {
  private dataAccess: RetweetDataAccess;

  constructor(dataAccess: RetweetDataAccess) {
    this.dataAccess = dataAccess;
  }

  public async retweet(
    userId: string,
    tweetId: string
  ): Promise<RetweetOutput> {
    try {
      const retweet = await this.dataAccess.createRetweet(userId, tweetId);
      return { retweet };
    } catch (cause) {
      throw new RetweetDataAccessError(cause, 'failed to create retweet');
    }
  }
}
