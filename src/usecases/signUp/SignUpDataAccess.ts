import { User } from 'entities';

export default interface SignUpDataAccess {
  findUserByName: (name: string) => Promise<User | null>;
  createUser: (
    name: string,
    fullName: string,
    bio: string,
    password: string
  ) => Promise<User>;
}
