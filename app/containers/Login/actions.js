/*
 *
 * Login actions
 *
 */

import {
  SUBMIT_CREDENTIALS,
} from './constants';

export function submitCredentials(email, password) {
  return {
    type: SUBMIT_CREDENTIALS,
    email,
    password,
  };
}
