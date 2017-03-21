/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';
import { REHYDRATE } from 'redux-persist/constants';

import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  LOAD_API,
  SUCCESS_API,
  ERROR_API,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
  user: {
    authenticated: false,
    token: '',
    id: '',
    email: '',
    name: '',
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REPOS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userData', 'repositories'], false);
    case LOAD_REPOS_SUCCESS:
      return state
        .setIn(['userData', 'repositories'], action.repos)
        .set('loading', false)
        .set('currentUser', action.username);
    case LOAD_REPOS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case LOAD_API:
      return state
        .set('loading', true)
        .set('error', false);
    case ERROR_API:
      return state
        .set('loading', false)
        .set('error', action.error);
    case SUCCESS_API:
      return state
        .set('loading', false)
        .set('error', false)
        .setIn(['user', 'authenticated'], true)
        .setIn(['user', 'token'], action.payload.token)
        .setIn(['user', 'id'], action.payload.user.id)
        .setIn(['user', 'email'], action.payload.user.email)
        .setIn(['user', 'name'], action.payload.user.name);
    case REHYDRATE: // eslint-disable-line no-case-declarations
      if (typeof action.payload.global === 'undefined') {
        return state;
      }
      const user = action.payload.global.get('user').toJS();
      return state
        .setIn(['user', 'authenticated'], user.authenticated)
        .setIn(['user', 'token'], user.token)
        .setIn(['user', 'id'], user.id)
        .setIn(['user', 'email'], user.email)
        .setIn(['user', 'name'], user.name);

    default:
      return state;
  }
}

export default appReducer;
