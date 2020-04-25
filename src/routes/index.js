const express = require('express');

const userRouter = require('./users.routes');

const routes = express.Router();

routes.use('/profile', userRouter);


module.exports = routes;
