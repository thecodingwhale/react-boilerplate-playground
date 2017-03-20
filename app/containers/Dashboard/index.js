/*
 *
 * Dashboard
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

export class Dashboard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        This is a protected page!.
      </div>
    );
  }
}

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(Dashboard);
