/*
 *
 * Login reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SUBMIT_CREDENTIALS,
} from './constants';

const initialState = fromJS({});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_CREDENTIALS:
      return state;
    default:
      return state;
  }
}

export default loginReducer;
