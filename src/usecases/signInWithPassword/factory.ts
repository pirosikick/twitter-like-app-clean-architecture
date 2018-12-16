import { ISignInWithPasswordFactory } from './interface';
import DataAccessError from './DataAccessError';

const signUpWithPasswordFactory: ISignInWithPasswordFactory = dataAccess => {
  return async function signUpWithPassword(input) {
    try {
      const user = await dataAccess.verifyPassword(
        input.userName,
        input.password
      );
      return user
        ? { succeeded: true, user }
        : { succeeded: false, user: null };
    } catch (cause) {
      throw new DataAccessError(cause, 'failed to verify password');
    }
  };
};

export default signUpWithPasswordFactory;
