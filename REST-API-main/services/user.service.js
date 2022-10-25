const express = require('express');
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const { log } = require('debug');
const NotFoundError = require('../utils/errors/not.found.error');
const DeleteError = require('../utils/errors/delete.error');
const SavingError = require('../utils/errors/saving.error');
const UnAuthorizedError = require('../utils/errors/unauthorized.error');
const config = require('../utils/config');

class UserService {
  constructor(model) {
    this.Model = model;
  }

  async create(name, email, userPassword) {
    try {
      const hash = md5(userPassword);
      const user = new this.Model({
        name,
        email,
        password: hash,
      });
      return await user.save();
    } catch (e) {
      throw new SavingError({ description: 'Can\'t save user' });
    }
  }

  // eslint-disable-next-line consistent-return
  async login(email, password) {
    try {
      const user = await this.Model.findOne({ email, isActive: true });
      const hash = md5(password);
      if (user.password === hash) {
        return jwt.sign({
          name: user.name,
          email: user.email,
          id: user._id,
        }, config.secretKey, { expiresIn: config.expiresIn });
      }
    } catch (e) {
      throw new UnAuthorizedError({ description: 'Bad credentials' });
    }
  }

  async getAll() {
    try {
      return await this.Model.find().select('-password');
    } catch (e) {
      throw new NotFoundError({ description: 'Can\'t get users list' });
    }
  }

  async getById(id) {
    try {
      return await this.Model.findById(id).select('-password');
    } catch (e) {
      throw new NotFoundError({ description: 'User not found' });
    }
  }

  async update(id, name, email) {
    try {
      const updatedUserData = {
        name,
        email,
      };
      return await this.Model.findByIdAndUpdate(id, updatedUserData, { new: true }).select('-password');
    } catch (e) {
      throw new SavingError({ description: 'Can\'t update the user\'s data' });
    }
  }

  async updatePassword(id, password, newPassword) {
    const hash = md5(password);
    const newHash = md5(newPassword);
    try {
      const user = await this.Model.findById(id);
      if (user.password === hash) {
        return await this.Model.findByIdAndUpdate(id, { password: newHash });
      }else{
      throw new NotFoundError({ description: 'Bad credentials' })}
    } catch (e) {
      throw new NotFoundError({ description: 'Can\'t find the user' });
    }
  }

  async delete(id) {
    try {
      return await this.Model.findOneAndDelete({ _id: id });
    } catch (e) {
      throw new DeleteError({ description: 'Can\'t delete user' });
    }
  }
}

module.exports = UserService;
