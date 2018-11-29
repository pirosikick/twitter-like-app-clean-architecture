import HnadlebarsView from './HandlebarsView';

interface Data {
  userName: string;
  password: string;
}

export default class SignInView extends HnadlebarsView<Data> {
  constructor() {
    super('signin');
  }
}
