
import {
  submitCredentials,
} from '../actions';
import {
  SUBMIT_CREDENTIALS,
} from '../constants';

describe('Login actions', () => {
  describe('Submit Crendential Action', () => {
    it('has a type of SUBMIT_CREDENTIALS', () => {
      const fixture = {
        email: 'foo@email.com',
        password: '1234',
      };
      const { email, password } = fixture;
      const expected = {
        type: SUBMIT_CREDENTIALS,
        email,
        password,
      };
      expect(
        submitCredentials(email, password)
      ).toEqual(expected);
    });
  });
});
