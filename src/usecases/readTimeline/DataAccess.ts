import { Timeline, User } from 'entities';

export default interface ShowTimelineDataAccess {
  findUserByName(name: string): Promise<User | null>;
  readTimeline(userId: string): Promise<Timeline>;
}
