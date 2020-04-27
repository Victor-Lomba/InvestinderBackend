const express = require('express');

const UserCreator = require('../services/user/create');
const ConsultorUserCreator = require('../services/user/createCons');
const UserLike = require('../services/actions/like');
const UserDislike = require('../services/actions/dislike');
const UserConsLike = require('../services/actions/likeCons');
const UserConsDislike = require('../services/actions/dislikeCons');

const isAuthenticated = require('../middleware/isAuthenticated');

const userRouter = express.Router();


userRouter.post('/investidor', UserCreator.create);

userRouter.post('/consultor', ConsultorUserCreator.create);

userRouter.post('consultor/:id/likes', isAuthenticated.confirmAuth, UserLike.like);

userRouter.post('consultor/:id/likes', isAuthenticated.confirmAuth, UserDislike.dislike);

userRouter.post('investidor/:id/likes', isAuthenticated.confirmAuth, UserConsLike.like);

userRouter.post('investidor/:id/likes', isAuthenticated.confirmAuth, UserConsDislike.dislike);

userRouter.patch('/edit/:id', isAuthenticated.confirmAuth);


module.exports = userRouter;
