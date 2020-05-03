const authConfig = require('../config/auth');
const { verify } = require('jsonwebtoken');

module.exports = {
    async confirmAuth(request, response, next){
        const authHeader = request.headers.authorization;

        if (!authHeader){
            return response.status(404).json({error: 'Token não encontrado!'});
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
            return response.status(404).json({error: 'Token inválido!'});
        }
    }
}
