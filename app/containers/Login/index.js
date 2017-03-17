/*
 *
 * Login
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import H1 from 'components/H1';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectLogin from './selectors';
import messages from './messages';
import LoginForm from './LoginForm';

export class Login extends React.Component { // eslint-disable-line react/prefer-stateless-function
  handleSubmit(values) {
    console.log(values.toJS());
  }
  render() {
    return (
      <div>
        <Helmet
          title="Login"
          meta={[
            { name: 'description', content: 'Description of Login' },
          ]}
        />
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <LoginForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  Login: makeSelectLogin(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
