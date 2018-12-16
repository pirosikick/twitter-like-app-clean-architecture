import * as React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import * as pages from './pages';

interface IProps {
  store: Store;
}

const Root: React.FC<IProps> = props => (
  <Provider store={props.store}>
    <Router>
      <>
        <Route path="/signin" component={pages.SignIn} />
        <Route path="/signup" component={pages.SignUp} />
        <Route path="/" exact component={pages.Timeline} />
      </>
    </Router>
  </Provider>
);

export default Root;
