import { Retweet } from '@pirosikick/entities';

export default interface RetweetDataAccess {
  createRetweet: (userId: string, tweetId: string) => Promise<Retweet>;
}
