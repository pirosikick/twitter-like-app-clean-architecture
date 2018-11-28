import { User } from 'entities';
import InvalidUserCredential from './InvalidUserCredential';
import SignInDataAccess from './SignInDataAccess';
import SignInDataAccessError from './SignInDataAccessError';

interface SignInOutput {
  user: {
    id: string;
    name: string;
    fullName: string;
    bio: string;
    createdAt: Date;
  };
}

export default class SignInUseCase {
  private dataAccess: SignInDataAccess;

  constructor(dataAccess: SignInDataAccess) {
    this.dataAccess = dataAccess;
  }

  public async signIn(
    userName: string,
    password: string
  ): Promise<SignInOutput> {
    let isPasswordCorrect;
    try {
      isPasswordCorrect = await this.dataAccess.isUserPasswordCorrect(
        userName,
        password
      );
    } catch (cause) {
      throw new SignInDataAccessError(
        cause,
        'failed to check password correctness'
      );
    }

    if (!isPasswordCorrect) {
      throw new InvalidUserCredential(
        'either or both of user name and password is incorrect'
      );
    }

    let user: User | null;
    try {
      user = await this.dataAccess.findUserByName(userName);
    } catch (cause) {
      throw new SignInDataAccessError(cause, 'failed to find user by name');
    }

    if (!user) {
      throw new Error('user not exists');
    }

    return { user };
  }
}
