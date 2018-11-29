import { View } from 'views';

export interface Redirect {
  to: string;
  query?: object;
}

export interface RenderView {
  httpStatus: 200 | 404 | 500;
  view: View;
}

export type Response = Redirect | RenderView;
