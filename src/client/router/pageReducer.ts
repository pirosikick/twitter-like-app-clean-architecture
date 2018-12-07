import * as React from 'react';
import { Action, NOT_FOUND } from 'redux-first-router';
import ActionType from './ActionType';
import * as timeline from '../timeline';

const components: { [key: string]: React.ComponentType } = {
  [ActionType.HOME]: timeline.Container,
  [ActionType.TIMELINE]: timeline.Container
};

type State = React.ComponentType;

export default (state: State = timeline.Container, action: Action) => {
  return components[action.type] || state;
};
