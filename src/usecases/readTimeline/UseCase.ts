import ReadTimelineDataAccess from './DataAccess';
import ReadTimelineDataAccessError from './DataAccessError';
import UserNotExists from './UserNotExists';

export interface ReadTimelineInput {
  userName: string;
}
export interface ReadTimelineOutput {
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

export default class ReadTimelineUseCase {
  constructor(private dataAccess: ReadTimelineDataAccess) {}

  public async readTimeline(
    input: ReadTimelineInput
  ): Promise<ReadTimelineOutput> {
    let user;
    try {
      user = await this.dataAccess.findUserByName(input.userName);
    } catch (cause) {
      throw new ReadTimelineDataAccessError(
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
      throw new ReadTimelineDataAccessError(cause, 'failed to read timeline');
    }
  }
}
