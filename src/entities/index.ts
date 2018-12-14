export interface IUser {
  id: string;
  name: string;
  createdAt: Date;
}

export function isUserNameValid(name: string) {
  return /^[a-zA-Z0-9_]+$/.test(name);
}

export interface ITweet {
  id: string;
  userId: string;
  text: string;
  createdAt: Date;
}

export function isTweetTextValid(tweetText: string): boolean {
  return tweetText.length > 0 && tweetText.length <= 140;
}

export interface IRetweet {
  id: string;
  userId: string;
  tweetId: string;
  createdAt: Date;
}

// export interface ITimelineItem {
//   tweet: ITweet;
//   retweeted: boolean;
// }
//
// export interface ITimeline {
//   user: IUser;
//   items: ITimelineItem[];
// }
//
