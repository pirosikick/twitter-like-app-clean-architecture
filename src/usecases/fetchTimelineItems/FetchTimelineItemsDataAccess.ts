import { TimelineItem, User } from 'entities';

export default interface FetchTimelineItemsDataAccess {
  findUserByName: (name: string) => Promise<User | null>;
  fetchTimelineItems: (userId: string) => Promise<TimelineItem[]>;
}
