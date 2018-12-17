import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as usecases from '@pirosikick/usecases';
import * as app from './app';
import configureStore from './configureStore';
import Root from './Root';
import diContainer from './diContainer';

const createUser = diContainer.resolve<usecases.createUser.ICreateUser>(
  'createUser'
);

createUser({ userName: 'pirosikick' }).then(output => {
  const store = configureStore();
  store.dispatch(
    app.actions.setUser({ id: output.user.id, name: output.user.name })
  );
  ReactDOM.render(<Root store={store} />, document.getElementById(
    'app'
  ) as Element);
});
