/*
 *
 * Login
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { Alert } from 'reactstrap';
import { browserHistory } from 'react-router';
import { makeSelectLoading, makeSelectError, makeSelectUser } from 'containers/App/selectors';
import messages from './messages';
import LoginForm from './LoginForm';
import { submitCredentials } from './actions';

export class Login extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    const { user } = this.props;
    if (user.authenticated) {
      browserHistory.push('/dashboard');
    }
  }
  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;
    if (user.authenticated) {
      browserHistory.push('/dashboard');
    }
  }
  handleSubmit(crendetials) {
    const email = crendetials.get('email');
    const password = crendetials.get('password');
    this.props.onSubmitForm(email, password);
  }
  renderAlert() {
    const { error, user } = this.props;
    if (error) {
      return (
        <Alert color="danger">
          {error.message}
        </Alert>
      );
    }

    if (user.authenticated) {
      return (
        <Alert color="success">
          Welcome, { user.name }
        </Alert>
      );
    }

    return null;
  }
  render() {
    const { loading, error, user } = this.props;
    return (
      <div>
        <Helmet
          title="Login"
          meta={[
            { name: 'description', content: 'Description of Login' },
          ]}
        />
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        {this.renderAlert()}
        <LoginForm
          onSubmit={this.handleSubmit}
          loading={loading}
          errors={error.errors}
          authenticated={user.authenticated}
        />
      </div>
    );
  }
}

Login.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]).isRequired,
  user: PropTypes.shape({
    authenticated: PropTypes.bool,
    token: PropTypes.string,
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    email: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  user: makeSelectUser(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: (email, password) => {
      dispatch(submitCredentials(email, password));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
