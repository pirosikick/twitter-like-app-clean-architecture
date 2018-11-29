import * as controllers from 'controllers';
import express from 'express';

export default function makeResponse(
  res: express.Response
): controllers.Response {
  return {
    setHttpStatus(status: number) {
      res.status(status);
    },
    render(html: string) {
      res.type('html');
      res.send(html);
    }
  };
}
