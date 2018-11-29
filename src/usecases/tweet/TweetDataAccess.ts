import { Tweet } from 'entities';

export default interface TweetDataAccess {
  createTweet: (userId: string, text: string) => Promise<Tweet>;
}
