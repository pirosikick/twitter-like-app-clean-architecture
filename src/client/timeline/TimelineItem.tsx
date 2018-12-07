import * as React from 'react';

interface Props {
  userName: string;
  tweetText: string;
  createdAt: string;
  retweeted: boolean;
  retweetDisabled: boolean;
}

export default function TimelineItem(props: Props) {
  return (
    <div>
      <span>@{props.userName}</span>
      <span>{props.createdAt}</span>
      <p>{props.tweetText}</p>
    </div>
  );
}
