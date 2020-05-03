const express = require('express');

const UserCreator = require('../services/user/create');
const List = require('../services/user/list');
const ListCons = require('../services/user/listCons');
const ConsultorUserCreator = require('../services/user/createCons');
const UserLike = require('../services/actions/like');
const UserDislike = require('../services/actions/dislike');
const UserConsLike = require('../services/actions/likeCons');
const UserConsDislike = require('../services/actions/dislikeCons');
const matcheslist = require('../services/user/searchmatches');
const matcheslistcons = require('../services/user/searchmatchesCons');

// const isAuthenticated = require('../middleware/isAuthenticated');

const userRouter = express.Router();


userRouter.post('/investidor', UserCreator.create);

userRouter.get('/investidor/matches',matcheslist.search);

userRouter.get('/consultor/matches',matcheslistcons.search);

userRouter.get('/investidor/list', List.index);

userRouter.get('/consultor/list', ListCons.index);

userRouter.post('/consultor', ConsultorUserCreator.create);

userRouter.post('/investidor/:TargetId/like', UserLike.like); // investidor curtindo consultor

userRouter.post('/investidor/:TargetId/dislike', UserDislike.dislike);

userRouter.post('/consultor/:TargetId/like', UserConsLike.like); // consultor curtindo investidor

userRouter.post('/consultor/:TargetId/dislike', UserConsDislike.dislike);


module.exports = userRouter;
