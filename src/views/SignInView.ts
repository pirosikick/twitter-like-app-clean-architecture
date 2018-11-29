import View from './View';
import * as Handlebars from 'handlebars';

interface TemplateData {
  actionUrl: string;
  userName: string;
}

const template = Handlebars.compile(`
<div class="sign-in">
  <h1>サインイン</h1>
  <form method="POST" action="{{actionUrl}}">
    <div>
      <label>
        ユーザ名: <input name="username" type="text" value="{{userName}}" />
      </label>
    </div>
    <div>
      <label>
        パスワード: <input name="password" type="password" value="{{password}}" />
      </label>
    </div>
    <button type="submit">サインイン</button>
  </form>
</div>
`);

export default class SignInView implements View {
  constructor(private templateData: TemplateData) {}
  public render() {
    return template(this.templateData);
  }
}
