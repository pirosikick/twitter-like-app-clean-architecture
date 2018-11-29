import View from './View';
import * as Handlebars from 'handlebars';

interface TemplateData {
  tweetActionUrl: string;
  items: Array<{
    user: {
      name: string;
      fullName: string;
    };
    text: string;
    createdAt: Date;
    isRetweet: boolean;
  }>;
}

const template = Handlebars.compile(`
  <div class="timeline">
    <form method="POST" action={{tweetActionUrl}}>
      <textarea name="text"></textarea>
      <button type="submit">ツィート</button>
    </form>
    <ul>
      {{#each items}}
      <li>
        <p>
          <span>@{{name}}</span>
          <span>@{{fullName}}</span>
          <span>{{createdAt}}</span>
        </p>
        <p class="timeline-item__text">{{text}}</p>
      </li>
      {{/each}}
    </ul>
  </div>
`);

export default class TimelineView implements View {
  private templateData: TemplateData;

  constructor(templateData: TemplateData) {
    this.templateData = templateData;
  }

  public render(): string {
    return template(this.templateData);
  }
}
