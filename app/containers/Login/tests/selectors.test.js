import { fromJS } from 'immutable';

import {
  selectLogin,
  // makeSelectLogin,
} from '../selectors';

describe('makeSelectLoginDomain', () => {
  it('selectLogin() should select the login state', () => {
    const loginState = fromJS({});
    const mockedState = fromJS({
      login: loginState,
    });
    expect(selectLogin(mockedState)).toEqual(loginState);
  });
});
