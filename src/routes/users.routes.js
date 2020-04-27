const express = require('express');
const multer = require('multer');

const uploadConfig = require('../config/pic');
const UserCreator = require('../services/user/create');
const UserLike = require('../services/actions/like');
const uploadService = require('../services/upload');
const isAuthenticated = require('../middleware/isAuthenticated');

const userRouter = express.Router();
const upload = multer(uploadConfig);

userRouter.post('/', UserCreator.create);

userRouter.post('/:id/likes', isAuthenticated, UserLike.like);

userRouter.put('/edit', );

module.exports = userRouter;
