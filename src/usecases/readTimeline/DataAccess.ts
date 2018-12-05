import { Timeline, User } from '@pirosikick/entities';

export default interface ShowTimelineDataAccess {
  findUserByName(name: string): Promise<User | null>;
  readTimeline(userId: string): Promise<Timeline>;
}
