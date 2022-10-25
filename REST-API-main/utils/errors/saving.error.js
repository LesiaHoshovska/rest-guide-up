const Error = require('http-errors');

class SavingError extends Error {
  constructor(...params) {
    super(params);
    this.message = 'Saving failed';
    this.code = '400';
    this.description = params.description;
  }
}

module.exports = SavingError;
