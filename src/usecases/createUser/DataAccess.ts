import { User } from '@pirosikick/entities';

export default interface CreateUserDataAccess {
  findUserByName(name: string): Promise<User | null>;
  createUser(name: string): Promise<User>;
}
