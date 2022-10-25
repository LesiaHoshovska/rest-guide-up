const Error = require('http-errors');

class UnauthorizedError extends Error {
  constructor(...params) {
    super(params);
    this.message = 'Bad credentials';
    this.code = '401';
    this.description = params.description;
  }
}

module.exports = UnauthorizedError;
