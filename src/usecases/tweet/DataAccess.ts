import { Tweet, User } from '@pirosikick/entities';

export default interface TweetDataAccess {
  findUserById(id: string): Promise<User | null>;
  createTweet(userId: string, text: string): Promise<Tweet>;
}
