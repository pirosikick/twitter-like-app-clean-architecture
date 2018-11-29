import express from 'express';
import bodyParser from 'body-parser';

export default (signInRouter: express.Router): express.Application => {
  const app = express();
  app.use(bodyParser.urlencoded());
  app.use(signInRouter);
  return app;
};
