import fs from 'fs';
import path from 'path';
import * as handlebars from 'handlebars';

const cache: { [name: string]: handlebars.TemplateDelegate } = {};

export default function loadTemplate(
  name: string
): handlebars.TemplateDelegate {
  if (!cache[name]) {
    const templatePath = path.join(
      __dirname,
      'templates',
      `${name}.handlebars`
    );
    const templateString = fs.readFileSync(templatePath, 'utf8');
    cache[name] = handlebars.compile(templateString);
  }
  return cache[name];
}
