import ShowTimelineDataAccess from './DataAccess';
import ShowTimelineDataAccessError from './DataAccessError';
import UserNotExists from './UserNotExists';

interface ShowTimelineInteractorInput {
  userName: string;
}
interface ShowTimelineInteractorOutput {
  user: {
    id: string;
    name: string;
    createdAt: Date;
  };
  timeline: {
    items: Array<{
      tweet: {
        id: string;
        user: {
          id: string;
          name: string;
          createdAt: Date;
        };
        text: string;
        createdAt: Date;
      };
      retweeted: boolean;
    }>;
  };
}

export default class ShowTimelineInteractor {
  constructor(private dataAccess: ShowTimelineDataAccess) {}

  public async showTimeline(
    input: ShowTimelineInteractorInput
  ): Promise<ShowTimelineInteractorOutput> {
    let user;
    try {
      user = await this.dataAccess.findUserByName(input.userName);
    } catch (cause) {
      throw new ShowTimelineDataAccessError(
        cause,
        'failed to find user by name'
      );
    }

    if (!user) {
      throw new UserNotExists();
    }

    try {
      const timeline = await this.dataAccess.readTimeline(user.id);
      return { user, timeline };
    } catch (cause) {
      throw new ShowTimelineDataAccessError(cause, 'failed to read timeline');
    }
  }
}
