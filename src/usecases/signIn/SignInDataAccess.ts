import { User } from 'entities';

export default interface SignInDataAccess {
  isUserPasswordCorrect: (
    userName: string,
    password: string
  ) => Promise<boolean>;
  findUserByName: (name: string) => Promise<User | null>;
}
