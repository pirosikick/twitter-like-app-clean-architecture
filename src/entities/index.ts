export interface User {
  id: string;
  name: string;
  createdAt: Date;
}

export function isUserNameValid(name: string) {
  return /^[a-zA-Z0-9_]+$/.test(name);
}

export interface Tweet {
  id: string;
  user: User;
  text: string;
  createdAt: Date;
}

export function isTweetTextValid(tweetText: string): boolean {
  return tweetText.length > 0 && tweetText.length <= 140;
}

export interface Retweet {
  id: string;
  user: User;
  tweet: Tweet;
  createdAt: Date;
}

export interface TimelineItem {
  tweet: Tweet;
  retweeted: boolean;
}

export interface Timeline {
  user: User;
  items: TimelineItem[];
}
