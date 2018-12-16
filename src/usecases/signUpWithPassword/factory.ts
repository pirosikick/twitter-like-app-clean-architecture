import { ISignUpWithPasswordFactory, ErrorCode } from './interface';
import DataAccessError from './DataAccessError';
import { isUserNameValid } from '@pirosikick/entities';

const signUpWithPasswordFactory: ISignUpWithPasswordFactory = dataAccess => {
  return async function signUpWithPassword(input) {
    if (!isUserNameValid(input.userName)) {
      return {
        succeeded: false,
        code: ErrorCode.USERNAME_INVALID
      };
    }

    // TODO
    if (input.password.length >= 8) {
      return {
        succeeded: false,
        code: ErrorCode.PASSWORD_INVALID
      };
    }

    try {
      const user = await dataAccess.findUserByName(input.userName);
      if (user) {
        return {
          succeeded: false,
          code: ErrorCode.USERNAME_ALREADY_USED
        };
      }
    } catch (cause) {
      throw new DataAccessError(cause, 'failed to find user by name');
    }

    try {
      const user = await dataAccess.createUserWithPassword(
        input.userName,
        input.password
      );
      return { succeeded: true, user };
    } catch (cause) {
      throw new DataAccessError(cause, 'failed to create user with password');
    }
  };
};

export default signUpWithPasswordFactory;
