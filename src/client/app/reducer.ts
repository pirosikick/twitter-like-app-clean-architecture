import { Reducer } from 'redux';
import { IUser } from '../types';
import { ActionType, IAction } from './types';
import * as actions from './actions';

export interface IState {
  readonly user: IUser | null;
}
const initialState = { user: null };

export default (state: IState = initialState, action: IAction) => {
  if (action.type === ActionType.SET_USER) {
    return { ...state, user: action.payload };
  }
  return state;
};
