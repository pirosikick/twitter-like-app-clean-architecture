export interface User {
  id: string;
  displayName: string;
}

export interface Tweet {
  id: string;
  text: string;
  userId: string;
  tweetedAt: Date;
}

export interface Retweet {
  userId: string;
  tweetId: string;
  retweetedAt: Date;
}

export interface Fav {
  tweetId: string;
  userId: string;
  favAt: Date;
}

export function isUserDisplayNameValid(displayName: string) {
  return !!displayName;
}

export function isTweetTextValid(tweetText: string) {
  return tweetText.length <= 140;
}
