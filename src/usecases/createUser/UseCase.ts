import { User, isUserNameValid } from '@pirosikick/entities';
import CreateUserDataAccess from './DataAccess';
import CreateUserDataAccessError from './DataAccessError';
import InvalidUserName from './InvalidUserName';
import UserNameDuplicated from './UserNameDuplicated';

export interface CreateUserInput {
  userName: string;
}

export interface CreateUserOutput {
  user: {
    id: string;
    name: string;
    createdAt: Date;
  };
}

export default class CreateUserUseCase {
  constructor(private dataAccess: CreateUserDataAccess) {}

  public async createUser(input: CreateUserInput): Promise<CreateUserOutput> {
    if (!isUserNameValid(input.userName)) {
      throw new InvalidUserName();
    }

    let user: User | null;
    try {
      user = await this.dataAccess.findUserByName(input.userName);
    } catch (cause) {
      throw new CreateUserDataAccessError(cause, 'failed to find user by name');
    }

    if (user) {
      throw new UserNameDuplicated();
    }

    try {
      const newUser = await this.dataAccess.createUser(input.userName);
      return { user: newUser };
    } catch (cause) {
      throw new CreateUserDataAccessError(cause, 'failed to create user');
    }
  }
}
