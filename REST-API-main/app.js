const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const unless = require('express-unless');
const mongoose = require('mongoose');
const authMiddleware = require('./utils/auth/auth.middlewares');
const config = require('./utils/config');

mongoose.connect(`mongodb://${config.host}:${config.db_port}/${config.db_name}`);

const indexRouter = require('./controllers/status.controller');
const userRouter = require('./controllers/user.controller');
const postRouter = require('./controllers/post.controller');

const app = express();

app.use(cors({
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT'],
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(unless(authMiddleware, {
  path: [
    { url: '/users', methods: ['POST'] },
    { url: '/users/login', methods: ['POST'] },
    { url: '/posts', methods: ['GET'] },
    { url: '/', methods: ['GET'] },
  ],
}));

app.use('/', indexRouter);
app.use('/posts', postRouter);
app.use('/users', userRouter);

// app.use((req, res, next) => {
//   next(createError(404));
// });
//
// app.use((err, req, res, next) => {
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   next();
// });

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message || 'Internal server error',
    status: error.status || 500,
    description: error.description || 'Something went wrong',
  });
});

module.exports = app;
