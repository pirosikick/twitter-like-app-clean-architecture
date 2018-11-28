import FetchTimelineItemsDataAccess from './FetchTimelineItemsDataAccess';
import FetchTimelineItemsDataAccessError from './FetchTimelineItemsDataAccessError';

interface FetchTimelineItemsOutput {
  timelineItems: Array<{
    id: string;
    userId: string;
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
    userId: string
  ): Promise<FetchTimelineItemsOutput> {
    try {
      return {
        timelineItems: await this.dataAccess.fetchTimelineItems(userId)
      };
    } catch (cause) {
      throw new FetchTimelineItemsDataAccessError(
        cause,
        'failed to fetch timeline items'
      );
    }
  }
}
