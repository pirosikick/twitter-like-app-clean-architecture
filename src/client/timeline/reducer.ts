import { ActionType, getType } from 'typesafe-actions';
import * as actions from './actions';

export type Action = ActionType<typeof actions>;

export interface User {
  readonly id: string;
  readonly name: string;
}

export interface TimelineItem {
  readonly tweetId: string;
  readonly user: User;
  readonly tweetText: string;
  readonly createdAt: Date;
  readonly retweeted: boolean;
}

export interface Timeline {
  readonly user: User;
  readonly items: TimelineItem[];
}

export interface State {
  readonly inputTweetText: string;
  readonly timeline: Timeline | null;
  readonly tweeting: boolean;
}

const initialState = {
  inputTweetText: '',
  timeline: null,
  tweeting: false
};

function timelineReducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case getType(actions.changeInputTweetText):
      return { ...state, inputTweetText: action.payload };

    default:
      return state;
  }
}

export default timelineReducer;
