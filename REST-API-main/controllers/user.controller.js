const express = require('express');

const router = express.Router();
const { json } = require('express');
const userServiceFactory = require('../utils/factory/user.service.factory')
const schemaValidator = require('../utils/validators/user-validators/user.add.validator');
const schemaUpdateValidator = require('../utils/validators/user-validators/user.update.validator');
const passValidator = require('../utils/validators/user-validators/pass.change.validator');

router.post('/', (req, res, next) => {
  schemaValidator(req.body);
  next();
}, async (req, res, next) => {
  try {
    const userService = userServiceFactory();
    const newUser = await userService.create(req.body.name, req.body.email, req.body.password);
    res.status(200).json(newUser);
  } catch (e) {
    next(e);
  }
});

router.post('/login', (req, res, next) => {
  schemaUpdateValidator(req.body);
  next();
}, async (req, res, next) => {
  try {
    const userService = userServiceFactory();
    const token = await userService.login(req.body.email, req.body.password);
    res.status(200).json(token);
  } catch (e) {
    next(e);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const userService = userServiceFactory();
    const users = await userService.getAll();
    res.status(200).json(users);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const userService = userServiceFactory();
    const userInfo = await userService.getById(req.params.id);
    res.status(200).json(userInfo);
  } catch (e) {
    next(e);
  }
});

router.put('/:id', (req, res, next) => {
  schemaUpdateValidator(req.body);
  next();
}, async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const userService = userServiceFactory();
    const updatedUser = await userService.update(req.params.id, name, email);
    res.status(200).json(updatedUser);
  } catch (e) {
    next(e);
  }
});

router.put('/:id/change-password', (req, res, next) => {
  passValidator(req.body);
  next();
}, async (req, res, next) => {
  try {
    const userService = userServiceFactory();
    const { id } = req.params;
    const { password, newPassword } = req.body;
    await userService.updatePassword(id, password, newPassword);
    res.status(200).json({ passStatus: 'Update successfully' });
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const userService = userServiceFactory();
    const deletedUser = await userService.delete(req.params.id);
    res.status(200).json({ success: true, deletedUser });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
