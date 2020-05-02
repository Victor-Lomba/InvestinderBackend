const connection = require('../../database/connection');

module.exports = {
    async like(request, response) {
        const  TargetId  = request.params;
        const  UserId  = request.headers;

        const loggedUser = await connection('investidores').where('id', UserId).select('*');

        const targetUser = await connection('consultores').where('id', TargetId).select('*');

        if (!targetUser) {
            throw new Error('Consultor/acessor não encontrado');
        }

        const oldLikes = loggedUser.likes;

        const matcheck = targetUser.likes;

        if (matcheck.indexOf(loggedUser.id)) {
            const OldMatches = loggedUser.matches;

            loggedUser.update('likes', [OldMatches, targetUser.id]);

            const loggedSocket = request.connectedUsers[id];
            const targetSocket = request.connectedUsers[TargID];

            if (loggedSocket) {
                request.io.to(loggedSocket).emit('Match!', targetUser);
            }

            if (targetSocket) {
                request.io.to(targetSocket).emit('Match!', loggedUser);
            }
        }

        loggedUser.update('likes', [oldLikes, targetUser.id]);


        return response.json(loggedUser);
    }
}
