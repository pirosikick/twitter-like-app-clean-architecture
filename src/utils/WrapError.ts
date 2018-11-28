import AutoNamedError from './AutoNamedError';

export default class WrapError extends AutoNamedError {
  public cause: Error;

  constructor(cause: Error, message: string) {
    super(`${message}: ${cause.message}`);
    this.cause = cause;
  }
}
