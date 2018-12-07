import * as React from 'react';
import TimelineItem from './TimelineItem';

interface User {
  id: string;
  name: string;
}

export interface Props {
  tweetDisabled: boolean;
  inputTweetText: string;
  onChangeInputTweetText: (inputTweetText: string) => void;
  timeline: null | {
    user: User;
    items: Array<{
      tweetId: string;
      userName: string;
      tweetText: string;
      createdAt: string;
      retweeted: boolean;
      retweetDisabled: boolean;
    }>;
  };
}

export default function Timeline({
  inputTweetText,
  onChangeInputTweetText,
  timeline,
  tweetDisabled
}: Props) {
  return (
    <div>
      <form>
        <textarea
          value={inputTweetText}
          onChange={e => {
            e.preventDefault();
            onChangeInputTweetText(e.target.value);
          }}
          disabled={tweetDisabled}
        />
        <button type="submit" disabled={tweetDisabled}>
          ツィートする
        </button>
      </form>
      {timeline && (
        <ul>
          {timeline.items.map(item => (
            <li key={`timeline-tweet-${item.tweetId}`}>
              <TimelineItem {...item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
