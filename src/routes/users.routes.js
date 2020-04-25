const express = require('express');
const multer = require('multer');

const uploadConfig = require('../config/pic');
const uploadService = require('../services/upload');
const isAuthenticated = require('../middleware/isAuthenticated');

const userRouter = express.Router();
const upload = multer(uploadConfig);

userRouter.get('/dashboard', );

userRouter.post('/', );

userRouter.put('/profile', );

usersRouter.patch(
    '/pic',
    ensureAuthenticated,
    upload.single('pic'),
    async (request, response) => {
        const updateUserAvatar = new uploadService();

        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            pic_filename: request.file.filename,
        });

        delete user.password;

        return response.json(user);
    },
);
