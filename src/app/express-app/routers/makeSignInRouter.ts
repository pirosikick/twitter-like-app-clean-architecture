import express from 'express';
import * as controllers from 'controllers';
import makeResponse from '../makeResponse';
import makeRequest from '../makeRequest';

export default (
  signInController: controllers.SignInController
): express.Router => {
  const router = express.Router();

  router.get('/signin', (req, res) => {
    const session = req.session || ({} as any);
    const requestData = {
      userName: session.userName || '',
      password: session.password || ''
    };
    signInController.get(makeRequest(req, requestData), makeResponse(res));
  });

  router.post('/signin', async (req, res) => {
    const session = req.session || ({} as any);
    const requestData = {
      userName: session.userName || '',
      password: session.password || ''
    };
    const delegate = {
      showSignIn(userName: string, password: string) {
        if (req.session) {
          req.session.userName = userName;
          req.session.password = password;
        }
        res.redirect('/signin');
      },
      showHome() {
        res.redirect('/');
      }
    };

    signInController.post(
      makeRequest(req, requestData),
      makeResponse(res),
      delegate
    );
  });

  return router;
};
