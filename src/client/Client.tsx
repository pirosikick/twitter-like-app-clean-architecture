import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Store, Action } from 'redux';
import { Provider } from 'react-redux';
import Root from './Root';
import configureStore from './configureStore';

export default class Client {
  private store: Store = configureStore();

  public dispatchAction(action: Action) {
    this.store.dispatch(action);
  }

  public renderTo(container: Element) {
    ReactDOM.render(
      <Provider store={this.store}>
        <Root />
      </Provider>,
      container
    );
  }
}
