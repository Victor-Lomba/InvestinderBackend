const express = require('express');

const UserCreator = require('../services/user/create');
const List = require('../services/user/list');
const ListCons = require('../services/user/listCons');
const ConsultorUserCreator = require('../services/user/createCons');
const UserLike = require('../services/actions/like');
const UserDislike = require('../services/actions/dislike');
const UserConsLike = require('../services/actions/likeCons');
const UserConsDislike = require('../services/actions/dislikeCons');

const isAuthenticated = require('../middleware/isAuthenticated');

const userRouter = express.Router();


userRouter.post('/investidor', UserCreator.create);

userRouter.get('/investidor/list', List.index);

userRouter.get('/consultor/list', ListCons.index);

userRouter.post('/consultor', ConsultorUserCreator.create);

userRouter.post('/consultor/like',  UserLike.like);

userRouter.post('/consultor/dislike', isAuthenticated.confirmAuth, UserDislike.dislike);

userRouter.post('/investidor/like', isAuthenticated.confirmAuth, UserConsLike.like);

userRouter.post('/investidor/dislike', isAuthenticated.confirmAuth, UserConsDislike.dislike);

userRouter.patch('/edit/:id', isAuthenticated.confirmAuth);


module.exports = userRouter;
