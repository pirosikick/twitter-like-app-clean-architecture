import View from './View';
import * as Handlebars from 'handlebars';

interface TemplateData {
  actionUrl: string;
  userName: string;
  userFullName: string;
  userBio: string;
}

const template = Handlebars.compile(`
<div>
  <h1>サインアップ</h1>
  <form>
    <div>
      <label>
        ユーザ名: <input name="name" type="text" value="{{userName}}" />
      </label>
    </div>
    <div>
      <label>
        表示名: <input name="fullname" type="text" value="{{userFullName}}" />
      </label>
    </div>
    <div>
      <label>
        bio:
        <textarea name="bio">{{bio}}</textarea>
      </label>
    </div>
    <div>
      <label>
        パスワード: <input name="password1" type="password" value="" />
      </label>
    </div>
    <div>
      <label>
        パスワード再入力: <input name="password2" type="password" value="" />
      </label>
    </div>
    <button type="submit">サインアップ</button>
  </form>
</div>
`);

export default class SignUpView implements View {
  constructor(private templateData: TemplateData) {}
  public render() {
    return template(this.templateData);
  }
}
