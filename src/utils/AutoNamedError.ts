export default class AutoNamedError extends Error {
  public name = this.constructor.name;
}
