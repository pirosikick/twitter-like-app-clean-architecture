import { isUserFullNameValid, isUserNameValid } from 'entities';
import InvalidInput from './InvalidInput';
import NameDuplicated from './NameDuplicated';
import SignUpDataAccess from './SignUpDataAccess';
import SignUpDataAccessError from './SignUpDataAccessError';

interface SignUpOutput {
  user: {
    id: string;
    name: string;
    fullName: string;
    bio: string;
    createdAt: Date;
  };
}

export default class SignUpUseCase {
  private dataAccess: SignUpDataAccess;

  constructor(dataAccess: SignUpDataAccess) {
    this.dataAccess = dataAccess;
  }

  public async signUp(
    name: string,
    fullName: string,
    bio: string,
    password: string
  ): Promise<SignUpOutput> {
    if (!(isUserNameValid(name) && isUserFullNameValid(fullName))) {
      throw new InvalidInput(
        'either or both of name and fullName is invalid. '
      );
    }

    let user;
    try {
      user = await this.dataAccess.findUserByName(name);
    } catch (cause) {
      throw new SignUpDataAccessError(cause, 'failed to find user by name');
    }

    if (user) {
      throw new NameDuplicated();
    }

    try {
      return {
        user: await this.dataAccess.createUser(name, fullName, bio, password)
      };
    } catch (cause) {
      throw new SignUpDataAccessError(cause, 'failed to create user');
    }
  }
}
