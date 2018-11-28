import WrapError from './WrapError';

describe('WrapError', () => {
  const cause = new Error('dummy error');
  const message = 'dummy messsage';

  let err: WrapError;
  beforeEach(() => {
    err = new WrapError(cause, message);
  });

  test('message is `${message}: ${cause.message}`', () => {
    expect(err.message).toBe(`${message}: ${cause.message}`);
  });
});
