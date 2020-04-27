const express = require('express');

const userRouter = require('./users.routes');
const sessionsRouter = require('./session.routes');
const indexRouter = require('./dashboard.routes');

const routes = express.Router();

routes.use('/profile', userRouter);
routes.use('/login', sessionsRouter);

routes.get('/explore', indexRouter);


module.exports = routes;
