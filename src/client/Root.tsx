import * as React from 'react';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { IRootState } from './reducer';
import * as pages from './pages';

interface IProps {
  store: Store<IRootState>;
}

const Root: React.FC<IProps> = ({ store }) => (
  <Provider store={store}>
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
