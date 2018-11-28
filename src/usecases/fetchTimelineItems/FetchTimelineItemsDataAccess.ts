import { TimelineItem } from 'entities';

export default interface FetchTimelineItemsDataAccess {
  fetchTimelineItems: (userId: string) => Promise<TimelineItem[]>;
}
