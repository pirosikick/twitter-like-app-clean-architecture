import View from './View';

export default class NotFoundView implements View {
  public render() {
    return `
      <div class="not-found">
        <h1>404 Page not found</h1>
        <p>お探しのページが見つかりません</p>
      </div>
    `;
  }
}
