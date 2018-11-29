import FetchTimelineItemsDataAccess from './FetchTimelineItemsDataAccess';
import FetchTimelineItemsDataAccessError from './FetchTimelineItemsDataAccessError';
import { User } from 'entities';
import UserNotExists from './UserNotExists';

interface FetchTimelineItemsOutput {
  user: {
    id: string;
    name: string;
    fullName: string;
    bio: string;
    createdAt: Date;
  };
  timelineItems: Array<{
    id: string;
    user: User;
    text: string;
    createdAt: Date;
    isRetweet: boolean;
  }>;
}

export default class FetchTimelineItemsUseCase {
  private dataAccess: FetchTimelineItemsDataAccess;

  constructor(dataAccess: FetchTimelineItemsDataAccess) {
    this.dataAccess = dataAccess;
  }

  public async fetchTimeline(
    userName: string
  ): Promise<FetchTimelineItemsOutput> {
    let user;
    try {
      user = await this.dataAccess.findUserByName(userName);
    } catch (cause) {
      throw new FetchTimelineItemsDataAccessError(
        cause,
        `faield to find user by name: userName="${userName}"`
      );
    }

    if (!user) {
      throw new UserNotExists();
    }

    try {
      return {
        user,
        timelineItems: await this.dataAccess.fetchTimelineItems(user.id)
      };
    } catch (cause) {
      throw new FetchTimelineItemsDataAccessError(
        cause,
        'failed to fetch timeline items'
      );
    }
  }
}
