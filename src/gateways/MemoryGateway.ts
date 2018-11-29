import * as entities from 'entities';
import * as usecases from 'usecases';
import uuid from 'uuid/v4';

interface Tweet {
  id: string;
  userId: string;
  text: string;
  createdAt: Date;
}
interface Retweet {
  id: string;
  userId: string;
  tweetId: string;
  createdAt: Date;
}

export default class MemoryGateway implements usecases.DataAccess {
  private users: entities.User[] = [];
  private userCredentials: Array<{ userId: string; password: string }> = [];
  private tweets: Tweet[] = [];
  private retweets: Retweet[] = [];

  public createUser(
    name: string,
    fullName: string,
    bio: string,
    password: string
  ): Promise<entities.User> {
    const user = {
      id: uuid(),
      name,
      fullName,
      bio,
      createdAt: new Date()
    };
    const userCredential = {
      userId: user.id,
      password
    };

    this.users.push(user);
    this.userCredentials.push(userCredential);
    return Promise.resolve(user);
  }

  public findUserById(id: string): Promise<entities.User | null> {
    const user = this.users.find(u => u.id === id);
    return Promise.resolve(user || null);
  }

  public findUserByName(name: string): Promise<entities.User | null> {
    const user = this.users.find(u => u.name === name);
    return Promise.resolve(user || null);
  }

  public isUserPasswordCorrect(
    userName: string,
    password: string
  ): Promise<boolean> {
    const user = this.users.find(u => u.name === userName);
    if (!user) {
      return Promise.resolve(false);
    }

    const credential = this.userCredentials.find(c => c.userId === user.id);
    const correct = !!credential && credential.password === password;
    return Promise.resolve(correct);
  }

  public createTweet(userId: string, text: string): Promise<entities.Tweet> {
    const user = this.users.find(u => u.id === userId);
    if (!user) {
      throw new Error(`user whose id is "${userId}" not exists`);
    }

    const id = uuid();
    const createdAt = new Date();
    this.tweets.push({ id, text, userId: user.id, createdAt });
    return Promise.resolve({ id, text, user, createdAt });
  }

  public createRetweet(
    userId: string,
    tweetId: string
  ): Promise<entities.Retweet> {
    const user = this.users.find(u => u.id === userId);
    if (!user) {
      throw new Error(`user whose id is "${userId}" not exists`);
    }

    const tweet = this.findTweetById(tweetId);
    if (!tweet) {
      throw new Error(`tweet whose id is "${tweetId}" not exists`);
    }

    const id = uuid();
    const createdAt = new Date();
    this.retweets.push({ id, userId: user.id, tweetId: tweet.id, createdAt });
    return Promise.resolve({ id, user, tweet, createdAt });
  }

  public fetchTimelineItems(userId: string): Promise<entities.TimelineItem[]> {
    const tweetItems = this.tweets.map(this.tweetToEntity).map(tweet => ({
      ...tweet,
      isRetweet: false
    }));
    const retweetItems = this.retweets
      .map(this.retweetToEntity)
      .map(retweet => ({
        ...retweet.tweet,
        isRetweet: false
      }));
    const items = [...tweetItems, ...retweetItems].sort((a, b) =>
      a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0
    );

    return Promise.resolve(items);
  }

  private tweetToEntity(tweet: Tweet): entities.Tweet {
    const user = this.users.find(u => u.id === tweet.userId);
    if (!user) {
      throw new Error(`invalid tweet(id="${tweet.id}"): user not exists`);
    }

    return {
      id: tweet.id,
      user,
      text: tweet.text,
      createdAt: tweet.createdAt
    };
  }

  private retweetToEntity(retweet: Retweet): entities.Retweet {
    const user = this.users.find(u => u.id === retweet.userId);
    if (!user) {
      throw new Error(`invalid retweet(id="${retweet.id}"): user not exists`);
    }

    const tweet = this.findTweetById(retweet.tweetId);
    if (!tweet) {
      throw new Error(`invalid retweet(id="${retweet.id}"): tweet not exists`);
    }

    return {
      id: retweet.id,
      user,
      tweet,
      createdAt: retweet.createdAt
    };
  }

  private findTweetById(id: string): entities.Tweet | null {
    const tweet = this.tweets.find(t => t.id === id);
    return tweet ? this.tweetToEntity(tweet) : null;
  }
}
