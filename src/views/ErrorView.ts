import View from './View';

export default class ErrorView implements View {
  public render(): string {
    return `
      <div class="error">
        <p>エラーが発生しました。</p>
      </div>
    `;
  }
}
