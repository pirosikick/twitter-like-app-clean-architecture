import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from './reducer';

interface Props {
  page: React.ComponentType;
}

function Root({ page: Component }: Props) {
  return <Component />;
}

const mapStateToProps = (state: RootState) => ({
  page: state.page
});
export default connect(mapStateToProps)(Root);
