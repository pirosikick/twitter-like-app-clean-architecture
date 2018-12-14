import { User, isUserNameValid } from '@pirosikick/entities';
import { ICreateUserFactory } from './interface';
import DataAccessError from './DataAccessError';
import InvalidUserName from './InvalidUserName';
import UserNameDuplicated from './UserNameDuplicated';

const createUserFactory: ICreateUserFactory = dataAccess => {
  return async function createUser(input) {
    if (!isUserNameValid(input.userName)) {
      throw new InvalidUserName();
    }

    let user: User | null;
    try {
      user = await dataAccess.findUserByName(input.userName);
    } catch (cause) {
      throw new DataAccessError(cause, 'failed to find user by name');
    }

    if (user) {
      throw new UserNameDuplicated();
    }

    try {
      const newUser = await dataAccess.createUser(input.userName);
      return { user: newUser };
    } catch (cause) {
      throw new DataAccessError(cause, 'failed to create user');
    }
  };
};

export default createUserFactory;
