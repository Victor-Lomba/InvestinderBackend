const authConfig = require('../config/auth');
const { verify } = require('jsonwebtoken');

module.exports = {
    async confirmAuth(request, response, next){
        const authHeader = request.headers.authorization;

        if (!authHeader){
            throw new Error('JWT token não encontrado!');
        }

        var _a = authHeader.split(' '), token = _a[1];

        try {
            const decoded = verify(token, authConfig.jwt.secret);
            const sub = decoded.sub;

            request.user ={
                id: sub,
            };

            return next();
        } catch(err) {
            throw new Error('Token inválido');
        }
    }
}