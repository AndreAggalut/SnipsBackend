const ErrorWithHttpStatus = require('../utils/ErrorWithHttpStatus');
/**
 * Sends appropriate error message and code to the client
 * @param {*} err
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const errorHandler = (err, request, response, next) => {
  if (err instanceof ErrorWithHttpStatus)
    response.status(err.status).send(err.message);
  else response.status(500).send('Server Error');
};
module.exports = errorHandler;
