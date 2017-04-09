import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../index';
import LoginForm from '../LoginForm';

describe('<Login />', () => {
  it('should render <LoginForm /> by default', () => {
    const renderedContainer = shallow(
      <Login
        onSubmitForm={() => {}}
        error={false}
        user={{
          authenticated: false,
          token: '',
          id: '',
          email: '',
          name: '',
        }}
        loading={false}
      />
    );
    expect(renderedContainer.find(LoginForm).length).toEqual(1);
  });
});
