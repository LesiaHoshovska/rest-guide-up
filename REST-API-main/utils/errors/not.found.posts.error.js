const Error = require('http-errors');

class NotFoundPostError extends Error {
  constructor(...params) {
    super(params);
    this.message = 'NOT FOUND';
    this.code = '500';
    this.description = params.description;
  }
}

module.exports = NotFoundPostError;
