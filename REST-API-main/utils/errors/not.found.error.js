const Error = require('http-errors');

class NotFoundError extends Error {
  constructor(...params) {
    super(params);
    this.message = 'NOT FOUND';
    this.code = '404';
    this.description = params.description;
  }
}

module.exports = NotFoundError;
