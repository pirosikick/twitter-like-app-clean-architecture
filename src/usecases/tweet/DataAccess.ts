import { Tweet } from 'entities';

export default interface DataAccess {
  createTweet: (userId: string, text: string) => Promise<Tweet>;
}
