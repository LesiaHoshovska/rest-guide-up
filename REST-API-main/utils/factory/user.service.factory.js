const UserService = require('../../services/user.service');
const User = require('../../models/user.model');

module.exports = () => {
  const userService = new UserService( User)
  return userService}
