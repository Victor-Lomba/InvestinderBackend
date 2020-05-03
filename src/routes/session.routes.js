const express = require('express');

const auth = require('../services/auth');

const sessionsRouter = express.Router();

sessionsRouter.post('/', async(request, response)=> {
    try {
        const { email, password } = request.body;

        const { user, token } = await auth.execute({ email, password });

        return response.json({ user, token });
    } catch(err) {
        return response.json({ error: err }).status(400);
    }
});

module.exports = sessionsRouter;
