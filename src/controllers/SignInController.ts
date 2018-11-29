import { signIn } from 'usecases';
import Request from './Request';
import Response from './Response';
import { SignInView } from 'views';

interface GetRequestData {
  userName: string;
  password: string;
}

export default class SignInController {
  constructor(private signInUseCase: signIn.SignInUseCase) {}

  public get(request: Request<GetRequestData>, response: Response) {
    const view = new SignInView();
    view.setData({
      userName: request.data.userName,
      password: request.data.password
    });

    response.setHttpStatus(200);
    response.render(view.html());
  }

  public async post(
    request: Request,
    response: Response,
    delegate: {
      showSignIn: (userName: string, password: string) => void;
      showHome: () => void;
    }
  ) {
    const userName = request.data.userName;
    const password = request.data.password;
    if (!userName || !password) {
      delegate.showSignIn(userName, password);
      return;
    }

    try {
      const output = await this.signInUseCase.signIn(userName, password);
      request.setSession('userId', output.user.id);
      delegate.showHome();
    } catch (cause) {
      delegate.showSignIn(userName, password);
    }
  }
}
