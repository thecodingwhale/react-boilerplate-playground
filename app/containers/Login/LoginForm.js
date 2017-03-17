import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const renderField = (field) => (
  <Input
    {...field.input}
    type={field.type}
    placeholder={field.placeholder}
  />
);

class LoginForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { handleSubmit } = this.props;
    return (
      <Form onSubmit={handleSubmit}>
        <FormGroup row>
          <Label for="label-email" sm={2}>Email</Label>
          <Col sm={10}>
            <Field
              name="email"
              type="email"
              component={renderField}
              placeholder="Enter your email address"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="label-password" sm={2}>Password</Label>
          <Col sm={10}>
            <Field
              name="password"
              type="password"
              component={renderField}
              placeholder="Enter your password"
            />
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button type="submit" outline color="primary">Submit</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'loginForm', // a unique name for this form
})(LoginForm);
