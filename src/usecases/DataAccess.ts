import { TweetDataAccess } from './tweet';
import { RetweetDataAccess } from './retweet';
import { SignUpDataAccess } from './signUp';
import { SignInDataAccess } from './signIn';
import { FetchTimelineItemsDataAccess } from './fetchTimelineItems';

export default interface DataAccess
  extends TweetDataAccess,
    RetweetDataAccess,
    SignUpDataAccess,
    SignInDataAccess,
    FetchTimelineItemsDataAccess {}
