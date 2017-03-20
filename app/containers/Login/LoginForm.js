import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { Col, Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

const renderField = ({ input, type, label, placeholder, meta: { touched, error } }) => ( // eslint-disable-line react/prop-types
  <FormGroup color={(touched && error) ? 'danger' : ''} row>
    <Label for={`label-${type}`} sm={2}>{label}</Label>
    <Col sm={10}>
      <Input
        {...input}
        type={type}
        placeholder={placeholder}
      />
      {touched && error && <FormFeedback>{error}</FormFeedback>}
    </Col>
  </FormGroup>
);

class LoginForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { handleSubmit, errors, loading, authenticated } = this.props;

    let submitText = 'Submit';

    if (loading) {
      submitText = 'Submitting...';
    }

    if (authenticated) {
      submitText = 'Redirecting...';
    }

    return (
      <Form onSubmit={handleSubmit}>
        <fieldset disabled={loading || authenticated}>
          <Field
            errors={errors}
            label="Email"
            name="email"
            type="email"
            component={renderField}
            placeholder="Enter your email address"
          />
          <Field
            errors={errors}
            label="Password"
            name="password"
            type="password"
            component={renderField}
            placeholder="Enter your password"
          />
          <FormGroup row>
            <Col sm={{ size: 10, offset: 2 }}>
              <Button type="submit" color="primary">
                {submitText}
              </Button>
            </Col>
          </FormGroup>
        </fieldset>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
};

LoginForm.defaultProps = {
  errors: {},
};


function validate(props) {
  const errors = {};

  if (!props.get('email')) {
    errors.email = 'Please enter an email';
  }

  if (!props.get('password')) {
    errors.password = 'Please enter a password';
  }

  return errors;
}

export default reduxForm({
  form: 'loginForm', // a unique name for this form
  validate,
})(LoginForm);
