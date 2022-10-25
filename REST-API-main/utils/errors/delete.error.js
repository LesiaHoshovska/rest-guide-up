const Error = require('http-errors');

class DeleteError extends Error {
  constructor(...params) {
    super(params);
    this.message = 'Delete Failed';
    this.code = '400';
    this.description = params.description;
  }
}

module.exports = DeleteError;
