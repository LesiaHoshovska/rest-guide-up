const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized.error');
const config = require('../config')


// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.replace(/^Bearer\s/, '');
    if (jwt.verify(token, config.secretKey)) {
      return next();
    }
  } catch (error) {
    next(new UnauthorizedError({ description: 'Bad email or password' }));
  }
};

