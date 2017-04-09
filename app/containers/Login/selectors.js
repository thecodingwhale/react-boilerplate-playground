import { createSelector } from 'reselect';

const selectLogin = () => (state) => state.get('login');

const makeSelectLogin = () => createSelector(
  selectLogin(),
  (substate) => substate.toJS()
);

export {
  selectLogin,
  makeSelectLogin,
};
