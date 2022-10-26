const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const unless = require("express-unless");
const mongoose = require("mongoose");
const authMiddleware = require("./utils/auth/auth.middlewares");
const config = require("./utils/config");

mongoose.connect(
  `mongodb://${config.host}:${config.db_port}/${config.db_name}`
);

const indexRouter = require("./controllers/status.controller");
const userRouter = require("./controllers/user.controller");
const tourRouter = require("./controllers/tour.controller");

const app = express();

app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT"],
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  unless(authMiddleware, {
    path: [
      { url: "/users", methods: ["POST"] },
      { url: "/users/login", methods: ["POST"] },
      { url: "/tours", methods: ["GET"] },
      { url: "/", methods: ["GET"] },
    ],
  })
);

app.use("/", indexRouter);
app.use("/tours", tourRouter);
app.use("/users", userRouter);

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message || "Internal server error",
    status: error.status || 500,
    description: error.description || "Something went wrong",
  });
});

module.exports = app;
