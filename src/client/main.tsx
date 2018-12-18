import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as usecases from '@pirosikick/usecases';
import * as app from './app';
import Root from './Root';
import diContainer from './diContainer';
import { IStore } from './types';

const createUser = diContainer.resolve<usecases.createUser.ICreateUser>(
  'createUser'
);
const store = diContainer.resolve<IStore>('store');

createUser({ userName: 'pirosikick' }).then(output => {
  store.dispatch(
    app.actions.setUser({ id: output.user.id, name: output.user.name })
  );
  ReactDOM.render(<Root store={store} />, document.getElementById(
    'app'
  ) as Element);
});
