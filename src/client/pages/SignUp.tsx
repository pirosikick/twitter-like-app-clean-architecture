import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { signUpWithPassword as usecase } from '@pirosikick/usecases';
import { IRootState } from '../types';
import { actions, operations, IState } from '../signUp';

const errorMessages = {
  [usecase.ErrorCode.USERNAME_ALREADY_USED]:
    '入力したユーザー名は既に利用されています。',
  [usecase.ErrorCode.USERNAME_INVALID]: 'ユーザー名は英数字１文字以上です。',
  [usecase.ErrorCode.PASSWORD_INVALID]: 'パスワードは8文字以上必要です。'
};

interface IProps {
  userNameInput: string;
  passwordInput: string;
  disabled: boolean;
  errorCode: IState['errorCode'];
  done: boolean;
  onChangeUserNameInput: (userNameInput: string) => void;
  onChangePasswordInput: (passwordInput: string) => void;
  onSubmit: () => void;
  onWillUnmount: () => void;
}

class SignUp extends React.Component<IProps, {}, {}> {
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
      return <Redirect to="/signin" />;
    }

    const { errorCode, userNameInput, passwordInput, disabled } = this.props;
    return (
      <div>
        <h2>サインアップ</h2>
        {errorCode && <p>{errorMessages[errorCode]}</p>}
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
            登録する
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  userNameInput: state.signUp.userNameInput,
  passwordInput: state.signUp.passwordInput,
  disabled: state.signUp.starting,
  errorCode: state.signUp.errorCode,
  done: state.signUp.done
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  ...bindActionCreators(
    {
      changeUserNameInput: actions.changeUserNameInput,
      changePasswordInput: actions.changePasswordInput,
      reset: actions.reset,
      signUp: operations.signUp
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
  onSubmit: () => {
    actionCreators.signUp(state.userNameInput, state.passwordInput);
  },
  onWillUnmount: actionCreators.reset
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(SignUp);
