import { Timeline } from './reducer';
import { RootState } from '../reducer';

function timelineItems(timeline: Timeline, userLoggedIn: boolean) {
  return timeline.items.map(item => ({
    tweetId: item.tweetId,
    userName: item.user.name,
    tweetText: item.tweetText,
    createdAt: item.createdAt.toDateString(),
    retweeted: item.retweeted,
    retweetDisabled: item.retweeted || !userLoggedIn
  }));
}

export function timelineToProps(rootState: RootState) {
  const { timeline } = rootState.timeline;
  if (!timeline) {
    return null;
  }

  const userLoggedIn = !!rootState.app.user;

  return {
    user: timeline.user,
    items: timelineItems(timeline, userLoggedIn)
  };
}

export function canTweet(rootState: RootState) {
  return !!rootState.app.user;
}
