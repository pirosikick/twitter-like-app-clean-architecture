export default interface Response {
  setHttpStatus(status: number): void;
  render(html: string): void;
}
