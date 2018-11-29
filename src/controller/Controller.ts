import * as usecases from 'usecases';
import * as views from 'views';
import { Response, Redirect, RenderView } from './Response';

export default class Controller {
  constructor(
    private tweetUseCase: usecases.tweet.TweetUseCase,
    private retweetUseCase: usecases.retweet.RetweetUseCase,
    private signInUseCase: usecases.signIn.SignInUseCase,
    private signUpUseCase: usecases.signUp.SignUpUseCase,
    private fetchTimelineItemsUseCase: usecases.fetchTimelineItems.FetchTimelineItemsUseCase,
    private logError: (message: string) => void
  ) {}

  public showSignUp(
    userName: string,
    userFullName: string,
    userBio: string
  ): Response {
    return {
      httpStatus: 200,
      view: new views.SignUpView({
        actionUrl: '/signup',
        userName,
        userFullName,
        userBio
      })
    };
  }

  public async signUp(
    name: string,
    fullName: string,
    bio: string,
    password: string,
    password2: string,
    delegate: {
      makeSession: (user: { id: string }) => void;
    }
  ): Promise<Response> {
    const redirectToForm = { to: '/signup', query: { name, fullName, bio } };

    if (password !== password2) {
      return redirectToForm;
    }

    let user;
    try {
      const output = await this.signUpUseCase.signUp(
        name,
        fullName,
        bio,
        password
      );
      user = output.user;
    } catch (cause) {
      this.logError(`failed to call signUpUseCase.signUp: ${cause.message}`);
      return redirectToForm;
    }

    try {
      await delegate.makeSession(user);
    } catch (cause) {
      this.logError(`failed to make session: ${cause.message}`);
      return redirectToForm;
    }

    return { to: '/' };
  }

  public showSignIn(userName: string): Response {
    return {
      httpStatus: 200,
      view: new views.SignInView({
        actionUrl: '/signin',
        userName
      })
    };
  }

  public async signIn(
    userName: string,
    password: string,
    delegate: {
      makeSession: (user: { id: string }) => void;
    }
  ): Promise<Response> {
    const redirectToForm = { to: '/signin' };

    let user;
    try {
      const output = await this.signInUseCase.signIn(userName, password);
      user = output.user;
    } catch (cause) {
      if (cause instanceof usecases.signIn.InvalidUserCredential) {
        return redirectToForm;
      }

      this.logError(`failed to call signInUseCase.signIn: ${cause.message}`);
      return {
        httpStatus: 500,
        view: new views.ErrorView()
      };
    }

    try {
      await delegate.makeSession(user);
    } catch (cause) {
      this.logError(`failed to make session: ${cause.message}`);
      return redirectToForm;
    }

    return { to: '/' };
  }

  public async showTimeline(userName: string): Promise<Response> {
    try {
      const output = await this.fetchTimelineItemsUseCase.fetchTimeline(
        userName
      );
      const view = new views.TimelineView({
        tweetActionUrl: '/tweet',
        items: output.timelineItems
      });
      return { httpStatus: 200, view };
    } catch (cause) {
      if (cause instanceof usecases.fetchTimelineItems.UserNotExists) {
        return { httpStatus: 404, view: new views.NotFoundView() };
      }

      this.logError(
        `failed to call fetchTimelineItemsUseCase.fetchTimeline: ${
          cause.message
        }`
      );
      return { httpStatus: 500, view: new views.ErrorView() };
    }
  }
}
