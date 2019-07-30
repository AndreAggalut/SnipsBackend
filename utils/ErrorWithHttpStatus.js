/**
 * Error message containing user friendly message and an HTTP status code
 */
class ErrorWithHttpStatus extends Error {
  /**
   *
   * @param {*} message user-friendly error message that
   * can be displayed in the front end
   * @param {*} status HTTP status code
   */
  constructor(message, status = 500) {
    super(message);
    this.status = status;
  }
}
module.exports = ErrorWithHttpStatus;
