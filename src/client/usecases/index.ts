import * as usecases from '@pirosikick/usecases';

const instances: {
  createUser?: usecases.createUser.ICreateUser;
  createTweet?: usecases.createTweet.ICreateTweet;
  getTweets?: usecases.getTweets.IGetTweets;
} = {};

export function inject({
  createUser,
  createTweet,
  getTweets
}: {
  createUser: usecases.createUser.ICreateUser;
  createTweet: usecases.createTweet.ICreateTweet;
  getTweets: usecases.getTweets.IGetTweets;
}) {
  instances.createUser = createUser;
  instances.createTweet = createTweet;
  instances.getTweets = getTweets;
}

export default instances;
