import express from 'express';
import * as controllers from 'controllers';

export default function makeRequest<Data>(
  req: express.Request,
  data: Data
): controllers.Request<Data> {
  return {
    data,
    setSession(key: string, value: any) {
      if (req.session) {
        req.session[key] = value;
      }
    }
  };
}
