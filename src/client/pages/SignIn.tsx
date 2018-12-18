import * as React from 'react';
import { Redirect } from 'react-router';
import { Dispatch, bindActionCreators } from 'redux';
import { IRootState } from '../types';
import { actions, operations, IState } from '../signIn';
import { connect } from 'react-redux';

interface IProps {
  userNameInput: string;
  passwordInput: string;
  disabled: boolean;
  error: IState['error'];
  done: boolean;
  onWillUnmount: () => void;
  onChangeUserNameInput: (userNameInput: string) => void;
  onChangePasswordInput: (passwordInput: string) => void;
  onSubmit: () => void;
}

class SignIn extends React.Component<IProps, {}, {}> {
  public componentWillUnmount() {
    this.props.onWillUnmount();
  }

  public handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.onSubmit();
  };

  public handleChangeUserNameInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.props.onChangeUserNameInput(event.target.value);
  };

  public handleChangePasswordInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.props.onChangePasswordInput(event.target.value);
  };

  public render() {
    if (this.props.done) {
      return <Redirect to="/" />;
    }

    const { userNameInput, passwordInput, disabled, error } = this.props;
    return (
      <div>
        <h2>サインイン</h2>
        {error &&
          (error === 'INVALID_INPUT' ? (
            <p>入力内容に誤りがあります。</p>
          ) : (
            <p>サインインに失敗しました</p>
          ))}
        <form onSubmit={this.handleSubmit}>
          <p>
            ユーザ名:{' '}
            <input
              type="string"
              value={userNameInput}
              onChange={this.handleChangeUserNameInput}
              disabled={disabled}
            />
          </p>
          <p>
            パスワード:{' '}
            <input
              type="password"
              value={passwordInput}
              onChange={this.handleChangePasswordInput}
              disabled={disabled}
            />
          </p>
          <button type="submit" disabled={disabled}>
            サインインする
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  userNameInput: state.signIn.userNameInput,
  passwordInput: state.signIn.passwordInput,
  starting: state.signIn.starting,
  error: state.signIn.error,
  done: state.signIn.done,
  disabled: state.signIn.starting
});

// const mapDispatchToProps = {
//   changeUserNameInput: actions.changeUserNameInput,
//   changePasswordInput: actions.changePasswordInput,
//   reset: actions.reset,
//   signIn: operations.signIn
// };
const mapDispatchToProps = (dispatch: Dispatch) => ({
  ...bindActionCreators(
    {
      changeUserNameInput: actions.changeUserNameInput,
      changePasswordInput: actions.changePasswordInput,
      signIn: operations.signIn,
      reset: actions.reset
    },
    dispatch
  )
});

const mergeProps = (
  state: ReturnType<typeof mapStateToProps>,
  actionCreators: ReturnType<typeof mapDispatchToProps>
) => ({
  ...state,
  onChangeUserNameInput: actionCreators.changeUserNameInput,
  onChangePasswordInput: actionCreators.changePasswordInput,
  onSubmit() {
    actionCreators.signIn(state.userNameInput, state.passwordInput);
  },
  onWillUnmount: actionCreators.reset
});
type MergeParams = ReturnType<typeof mergeProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(SignIn);
