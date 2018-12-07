import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../reducer';
import * as actions from './actions';
import * as selectors from './selectors';
import Timeline, { Props } from './Timeline';

const mapStateToProps = (state: RootState) => ({
  tweetDisabled: !selectors.canTweet(state),
  inputTweetText: state.timeline.inputTweetText,
  timeline: selectors.timelineToProps(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onChangeInputTweetText(inputTweetText: string) {
    dispatch(actions.changeInputTweetText(inputTweetText));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);
