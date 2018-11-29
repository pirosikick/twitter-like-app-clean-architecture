import * as Handlebars from 'handlebars';
import View from './View';
import loadTemplate from './loadTemplate';

export default abstract class HnadlebarsView<T = any> implements View {
  private template: Handlebars.TemplateDelegate;
  private data?: T;

  constructor(templateName: string) {
    this.template = loadTemplate(templateName);
  }

  public setData(data: T) {
    this.data = data;
  }

  public html(): string {
    return this.template(this.data);
  }
}
