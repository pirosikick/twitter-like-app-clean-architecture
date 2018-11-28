import { Tweet } from 'entities';
import DataAccess from './DataAccess';

import TweetUseCase from './TweetUseCase';

const id = 'dummy-id';
const userId = 'dummy-user-id';
const text = 'dummy tweet text';
const tweet = {
  id,
  userId,
  text,
  createdAt: new Date()
};

describe('TweetUseCase', () => {
  describe('tweet', () => {
    // describe('when text is too long', () => {});

    describe('when dataAccess.createTweet succeeds', () => {
      let useCase: TweetUseCase;
      let dataAccess: DataAccess;
      let returnValue: any;
      beforeEach(() => {
        dataAccess = {
          createTweet: jest.fn().mockResolvedValue(tweet)
        };
        useCase = new TweetUseCase(dataAccess);
        returnValue = useCase.tweet(userId, text);
      });

      it('must return the value dataAccess.createTweet returns', () => {
        expect(returnValue).toBe(tweet);
      });

      it('must call dataAccess.createTweet', () => {
        expect(dataAccess.createTweet).toHaveBeenCalledTimes(1);
        expect(dataAccess.createTweet).toHaveBeenCalledWith(userId, text);
      });
    });
  });
});
