import axios from 'axios';

axios.defaults.baseURL = process.env.API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  return response.data;
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  return response;
}

// Create a new object, that prototypically inherits from the Error constructor
function APIError(err) {
  this.status = err.status || 'APIError';
  this.message = err.message || 'Default Message';
  this.errors = err.errors || {};
  this.stack = (new Error()).stack;
}
APIError.prototype = Object.create(Error.prototype);
APIError.prototype.constructor = APIError;

function handleError(response) {
  let err = JSON.stringify(response);
  err = JSON.parse(err);

  throw new APIError({
    status: err.response.status,
    message: err.response.statusText,
    errors: err.response.data.error.errors,
  });
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options) {
  return axios(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .catch(handleError);
}
