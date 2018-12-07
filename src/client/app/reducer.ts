import { ActionType, getType } from 'typesafe-actions';
import { User } from '../types';
import * as actions from './actions';

export type Action = ActionType<typeof actions>;
export interface State {
  readonly user: User | null;
}
const initialState = { user: null };

export default (state: State = initialState, action: Action) => {
  if (action.type === getType(actions.setUser)) {
    return { ...state, user: action.payload };
  }
  return state;
};
