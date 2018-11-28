export interface User {
  id: string;
  name: string;
  fullName: string;
  bio: string;
  createdAt: Date;
}

export function isUserNameValid(name: string) {
  return /^[a-zA-Z0-9_]+$/.test(name);
}

export function isUserFullNameValid(fullName: string) {
  return !!fullName;
}

export interface Tweet {
  id: string;
  userId: string;
  text: string;
  createdAt: Date;
}

export function isTweetTextValid(tweetText: string): boolean {
  return tweetText.length > 0 && tweetText.length <= 140;
}

export interface Retweet {
  id: string;
  userId: string;
  tweet: Tweet;
  createdAt: Date;
}

export interface TimelineItem {
  id: string;
  userId: string;
  text: string;
  createdAt: Date;
  isRetweet: boolean;
}

export interface Favorite {
  userId: string;
  tweet: Tweet;
  createdAt: Date;
}
