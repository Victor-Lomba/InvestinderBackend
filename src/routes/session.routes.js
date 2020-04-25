const express = require('express');

const auth = require('../services/auth');

const sessionsRouter = express.Router();

sessionsRouter.post('/', async(request, response)=> {
    const { email, password } = request.body;

    const { user, token } = await auth.execute({ email, password });

    return response.json({ user, token });
});

module.exports = sessionsRouter;
